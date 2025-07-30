from flask import Flask, render_template, request, redirect, session
import json
import os
from srp import *

app = Flask(__name__)
app.secret_key = 'srp_demo_key'

USER_DB = 'users.json'

if not os.path.exists(USER_DB):
    with open(USER_DB, 'w') as f:
        json.dump({}, f)

@app.route('/')
def index():
    return redirect('/login')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        salt = generate_salt()
        x = H(salt, password)
        v = modexp(g, x)

        with open(USER_DB, 'r') as f:
            users = json.load(f)

        if username in users:
            return "User already exists"

        users[username] = {'salt': salt, 'verifier': v}
        with open(USER_DB, 'w') as f:
            json.dump(users, f)

        return redirect('/login')
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        I = request.form['username']
        p = request.form['password']
        with open(USER_DB, 'r') as f:
            users = json.load(f)

        if I not in users:
            return "Invalid username"

        s = users[I]['salt']
        v = int(users[I]['verifier'])

        a = generate_private_key()
        A = modexp(g, a)

        b = generate_private_key()
        B = (k * v + modexp(g, b)) % N

        u = H(A, B)
        x = H(s, p)
        S_client = modexp(B - k * modexp(g, x), a + u * x)
        K_client = H(S_client)

        S_server = modexp(A * modexp(v, u), b)
        K_server = H(S_server)

        if K_client == K_server:
            session['username'] = I
            return redirect('/welcome')
        else:
            return "Authentication failed"

    return render_template('login.html')

@app.route('/welcome')
def welcome():
    if 'username' not in session:
        return redirect('/login')
    return render_template('welcome.html', username=session['username'])

if __name__ == '__main__':
    app.run(debug=True)
