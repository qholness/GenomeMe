from flask import render_template, flash, session, redirect, url_for
import requests
import pandas as pd
from GenomeMe import app

@app.route('/')
@app.route('/index')
def index():
    
    return render_template('index.html', title="Home")

@app.route('/search')
def search():

    return render_template('search.html', title='Search')

@app.route('/search_results')
def results():
    data = session.get('data')

    if data:
        pd_data = pd.DataFrame(data['hits'])
        count_by_type = pd_data['type'].value_counts()
        return render_template('results.html', title='Search Results', count_by_type=count_by_type)
    return redirect(url_for('search'))

@app.route('/fetch', methods=['GET', 'POST'])
def fetch(r=None):

    response = requests.get("https://dcc.icgc.org/api/v1/projects/GBM-US/mutations?field=id,mutation,type,chromosome,start,end&size=100&order=desc")
    
    session['data'] = response.json()

    return redirect(url_for('results'))

@app.route('/clear')
def clear_session():

    session.clear()

    return redirect(url_for('index'))