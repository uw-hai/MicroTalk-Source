#!/bin/bash

if [ -e "combined.db" ]
then
  echo "Combined DB already exists..."
  exit 1
fi

sqlite3 combined.db < init_combined.sql
for i in `seq 1 $2`
do
	echo "SELECT $i AS question_id, * FROM data;" | sqlite3 $1/question_$i.db > $i_temp.csv
	echo ".import $i_temp.csv data" | sqlite3 combined.db
	rm $i_temp.csv
done
