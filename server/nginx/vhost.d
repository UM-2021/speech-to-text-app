location /staticfiles/ {
  alias /home/server/server/staticfiles/;
  add_header Access-Control-Allow-Origin *;
}

location /mediafiles/ {
  alias /home/server/web/mediafiles/;
  add_header Access-Control-Allow-Origin *;
}