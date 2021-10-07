---
# front matter
---
{%- assign items = site.data[site.metadata] | where_exp: 'item','item.county != nil' -%}
{%- assign counties = site.data.idahocounties -%}

var countyData = {"type":"FeatureCollection","features":[
    {%for county in counties%}{"type":"Feature","id":"{{county.id}}","properties":{"name":"{{county.name}}", "collections":"{%- assign countyitems = items | where_exp: 'item','item.county contains county.name' -%}{% for item in countyitems limit: 10 %}<a href='/collections/{{item.objectid}}.html'>{{item.title}}</a><br>{% if forloop.last %}{% if countyitems.size > 10 %} <b class='mt-2'><a href='/collections/{{item.objectid}}.html'>... + {{ countyitems.size | minus: 10 }} more collections</a></b>{% endif %}","number":{{countyitems.size| jsonify }}{%endif%}{%endfor%} },"geometry":{"type":"Polygon","coordinates":[[{{county.coordinates}}]]}}{% unless forloop.last%},{% endunless%}{% endfor %}
    ]}