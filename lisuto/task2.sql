create table Grades
(
   Grade_id   int,
   Student_id int,
   Class_id   int,
   Score      decimal
);

create table Students
(
   Student_id int primary key,
   City       varchar(100)
);

select student.Student_id
from 
    (
        select Student_id, avg(studentScore) as avgStudentScore
        from students
        group by studentName
    ) as student
where 
    a.avgStudentScore = (
        select max(avgStudentScore) 
        from (
            select avg(studentScore) as avgStudentScore 
            from students 
            group by studentName
        ) as a
    )