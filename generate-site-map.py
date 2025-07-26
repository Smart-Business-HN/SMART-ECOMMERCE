import csv
from datetime import datetime

# Configura estos valores:
csv_file = 'productos.csv'  # Tu archivo CSV
xml_file = 'sitemap-productos.xml'    # Nombre del archivo XML de salida
lastmod_date = '2024-12-19' # Fecha fija o puedes automatizar con datetime.today().strftime('%Y-%m-%d')
changefreq = 'monthly'
priority = '0.6'

# Leer URLs del CSV (asume que están en la primera columna)
with open(csv_file, newline='', encoding='utf-8') as f:
    reader = csv.reader(f)
    urls = [row[0].strip() for row in reader if row and row[0].startswith('http')]

# Generar sitemap XML
with open(xml_file, 'w', encoding='utf-8') as f:
    f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    f.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')
    
    for url in urls:
        f.write('  <url>\n')
        f.write(f'    <loc>{url}</loc>\n')
        f.write(f'    <lastmod>{lastmod_date}</lastmod>\n')
        f.write(f'    <changefreq>{changefreq}</changefreq>\n')
        f.write(f'    <priority>{priority}</priority>\n')
        f.write('  </url>\n')

    f.write('</urlset>\n')

print(f'Sitemap generado con éxito: {xml_file}')
