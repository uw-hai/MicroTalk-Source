#!/bin/bash

# Create a sqlite3 database for each question
if [ -d $1 ]
then
	echo 'Folder already exists'
	exit 1
fi

mkdir $1
for i in `seq 1 $2`
do
	sqlite3 $1/question_$i.db < $3
done

sqlite3 $1/users.db < $4
