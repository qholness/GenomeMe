from flask import render_template, flash, session, redirect, url_for, get_flashed_messages
from flask import request as flask_request
import requests
import pandas as pd
from GenomeMe import app

@app.route('/')
@app.route('/index')
def index():
    
    return render_template('index.html', title="Home")




@app.route('/search')
def search():
    '''User performs a search on the API'''

    return render_template('search.html', title='Search')



    
@app.route('/fetch', methods=['POST'])
def fetch(r=None):
    '''Fetch request from /search'''
    reqstring = flask_request.form.get('reqstring')

    if reqstring:

        flash("Request was: {}".format(reqstring))
        response = requests.get(reqstring)

    else:

        url = "https://dcc.icgc.org/api/v1/projects/GBM-US/"
        endpoint = flask_request.form.get('endpoint')
        fields = flask_request.form.get('fields')
        nsize = flask_request.form.get('nsize')

        if endpoint:
    

            if fields:
                trim_white_space = lambda s: s.lstrip().rstrip() # Just in case
                fields = ",".join(list(map(trim_white_space, fields.split(","))))

                url += endpoint + "?field=" + fields + "&" + "size=" + (nsize if nsize else 100)

                flash("Request was: {}".format(url))
                response = requests.get(url)

            else:
                flash("No fields specified")
                return redirect(url_for('search'))

        else:
            flash("No endpoint specified")
            return redirect(url_for('search'))

    # Successful API call
    if response.status_code == 200:

        session['data'] = response.json()

        return redirect(url_for('results'))

    flash("Request status code: {}".format(response.status_code))

    session['data'] = None

    return redirect(url_for('search'))




@app.route('/search_results')
def results():
    '''Page displaying search results'''
    data = session.get('data')

    if data:

        pd_data = pd.DataFrame(data['hits'])

        count_by_type = pd_data['mutation'].value_counts()
        mutations = sorted(list(pd_data['mutation'].unique()))
        chromosomes = sorted(list(pd_data['chromosome'].unique()))

        return render_template('results.html', title='Search Results', 
            count_by_type=count_by_type,
            mutations=mutations, chromosomes=chromosomes)

    return redirect(url_for('search'))




@app.route('/clear')
def clear_session():
    '''Begin a new search'''
    session.clear()

    return redirect(url_for('search'))