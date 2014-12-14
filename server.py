
import os
import json
import cgi
from BaseHTTPServer import HTTPServer
from SimpleHTTPServer import SimpleHTTPRequestHandler

import cgitb
cgitb.enable()

tasks = json.loads(open('./src/tasks.json').read())

def sendJSON(response):
	response.send_response(200)
	response.send_header('Content-Type', 'application/json')
	response.end_headers()
	with open('./src/tasks.json') as jsonfile:
		response.wfile.write(jsonfile.read())

class Handler(SimpleHTTPRequestHandler):
	def go_GET(self):
		if self.path == "/":
			response.send_response(200)
			response.send_header('Content-Type', 'text/html')
			response.end_headers()
			response.wfile.write(f.open('./src/todo.html'))
		if self.path == "/src/tasks.json":
			sendJSON(self)
		else:
			SimpleHTTPRequestHandler.do_GET(self)

	def do_POST(self):

		if (self.path == "/src/tasks.json"):
			form = cgi.FieldStorage(
				fp=self.rfile,
				headers=self.headers,
				environ={'REQUEST_METHOD':'POST', 'CONTENT_TYPE':self.headers['Content-Type']}
			)
			tasks.append({
				u"id": int(form.getfirst("id")),
				u"isComplete": bool(form.getfirst("isComplete")),
				u"isDeleted": bool(form.getfirst("isDeleted")),
				u"text": form.getfirst("text"),
				u"dateDue": form.getfirst("dateDue")
			})
			with open('./src/tasks.json', 'w') as outfile:
				json.dump(tasks, outfile)
			sendJSON(self)
		else:
			SimpleHTTPRequestHandler.do_POST(self)

	def do_DELETE(self):
		if (self.path == "/src/tasks.json"):
			form = cgi.FieldStorage()
			task_id = form.getfirst("id")
			tasks[:] = [task for task in tasks if task.get("id") != task_id]
			sendJSON(self)
		else:
			SimpleHTTPRequestHandler.do_DELETE(self)


if __name__ == '__main__':
	print "Server started on port 3000"
	server = HTTPServer(('127.0.0.1', 3000), Handler)
	server.serve_forever()