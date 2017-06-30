#/usr/bin/python3

from GenomeMe import app






if __name__ == '__main__':
    app.secret_key = 'tacosaresupertasty'
    
    app.config['SESSION_TYPE'] = 'filesystem'

    app.run(debug=True)