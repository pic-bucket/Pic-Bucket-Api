#!/bin/bash

API="http://localhost:4741"
URL_PATH="/sign-in"
# EMAIL=st@st.com
# PASSWORD=stst
# TOKEN=def49e7dc52846417cf86bdd13a2a19b

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'"
    }
  }'

echo
