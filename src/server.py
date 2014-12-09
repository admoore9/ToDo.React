
import os
import json
import cgi
from BaseHTTPServer import HTTPServer
from SimpleHTTPServer import SimpleHTTPRequestHandler

tasks = json.loads(open('tasks.json').read())

def sendJSON(response):
	response.send_response(200)
	response.send_header('Content-type', 'application/json')
	response.end_headers()
	response.wfile.write(json.dumps(tasks))

class Handler(SimpleHTTPRequestHandler):
	def go_GET(self):
		if (self.path == "/tasks.json"):
			sendJSON(self)
		else:
			SimpleHTTPRequestHandler.do_GET(self)

	def do_POST(self):
		if (self.path == "/tasks.json"):
			form = cgi.FieldStorage(
				fp=self.rfile,
				headers=self.headers,
				environ={'REQUEST_METHOD':'POST', 'CONTENT_TYPE':self.headers['Content-Type']}
			)
			tasks.append({
				u"id": form.getfirst("id"),
				u"isComplete": form.getfirst("iscomplete"),
				u"text": form.getfirst("text"),
				u"dateDue": form.getfirst("dateDue")
			})
			sendJSON(self)
		else:
			SimpleHTTPRequestHandler.do_POST(self)

if __name__ == '__main__':
	print "Server started on port 3000"
	server = HTTPServer(('127.0.0.1', 3000), Handler)
	server.serve_forever()