from django.http import HttpResponse,JsonResponse, HttpResponseNotFound
from django.template import RequestContext, loader
import json
import datetime
import os
import random
import math
from django.db import connection

def index(request):
    template = loader.get_template('dashboard/index.html')
    context = RequestContext(request,{})
    return HttpResponse(template.render(context))

def get_awards(request):
    level = int(request.GET["level"])
    award_count = 0
    award_students = []
    student_pool_index = 0

    #get the students that never selected
    student_pool = get_award_source()

    if(len(student_pool)==0):
        return None

    if level == 1: #award 1
        award_count = 1
    elif level ==2: #award 2
        award_count = 3
    elif level ==3: #award 3
        award_count = 5
    elif level == 4: #award 4
        award_count = 20
    elif level == 5: #award 5
        #give all the people that never get the award
        award_dict = {"students": student_pool}
        return JsonResponse(award_dict)
    else: #nothing
        pass

    for i in range(0,award_count):
        student_index = random.randint(0,len(student_pool))
        award_man = student_pool[student_index]
        award_students.append(award_man)
        student_pool.remove(award_man)

    #order by the first keyword: id
    award_students.sort(key=lambda x: x[0])
    print award_students
    award_dict = {"students": award_students}
    return JsonResponse(award_dict)


def get_award_source():
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM students WHERE status = 0")
    students = cursor.fetchall()
    return students

def record_selected_students(request):
    selectedIDs = json.loads(request.body)["student_ids"]

    cursor = connection.cursor()
    for ID in selectedIDs:
        print ID
        sql = ("UPDATE students SET status = 1 WHERE id=%s" % ( ID ))
        cursor.execute(sql)

    cursor.execute("SELECT * FROM students WHERE status = 1")
    students = cursor.fetchall()
    award_dict = {"UnselectedCount": len(students)}
    return JsonResponse(award_dict)


def reset(request):
    cursor = connection.cursor()
    cursor.execute("UPDATE students SET status = 0")
    return JsonResponse({"status": "OK"})


def init_db(request):
    cursor = connection.cursor()
    #first of all: delete all the students
    cursor.execute("DELETE FROM students")

    for i in range(1,49):
        strCount = str(i);
        if i<10:
            strCount = "0" + strCount
        sql = ("INSERT INTO students VALUES (%s,%s,%s)" % (strCount, "80"+strCount, str(0)))
        print sql
        cursor.execute(sql);
    cursor.execute("SELECT * FROM students")
    row = cursor.fetchall()
    print row
    print type(row)
    vsm_status_dict = {"students": row}
    return JsonResponse(vsm_status_dict)