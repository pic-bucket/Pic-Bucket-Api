#!/bin/bash

API="http://localhost:4741"
URL_PATH="/sign-up"
# EMAIL=st@st.com
# PASSWORD=stst
#  ıd 5cdae0244c440723fc3a060b



curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'",
      "password_confirmation": "'"${PASSWORD}"'"
    }
  }'

echo
