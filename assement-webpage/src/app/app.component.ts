import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { JsonPipe } from "@angular/common";

@Component({

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'assement-webpage';

  // Assumed json about courses data received from backend when application is loaded
  courseJson: any;
  
  // Assumed json about students data received from backend when application is loaded
  studentJson: any;

  // List of students belonging to the course currently selected
  selectedStudents: any = [];

  // Currently selected course who's details one is looking for
  selectedCourse: any = "";

  constructor(){}

  // Assuming data was received from  backend of existing students and courses, hence default
  // values were assumed.
  ngOnInit(){
    this.courseJson = {
      "courses":[
          {
              "cId": 100,
              "cName": "Math",
              "students":[ "Alex", "Ben"
              ] 
          },
          {
              "cId": 101,
              "cName":"Physics",
              "students":[ "Ben", "Carl"
              ]
          }
      ]
    }

    this.studentJson = {
      "students":[
          {
              "sId": 1000,
              "sName": "Alex"
          },
          {
              "sId": 1001,
              "sName": "Ben"
          },
          {
              "sId": 1002,
              "sName": "Carl"
          }
      ]
    }
    this.selectedCourse = this.courseJson.courses[0].cName;
    this.selectedStudents = this.courseJson.courses[0].students;
  }

  // Hides or Displays Course add form when Add Course button is pressed by changing css property 
  toggleCourseForm(){
    let addCourseElm = document.getElementById("add_course");
    if(addCourseElm != null){
      let formClass = addCourseElm.className;
      if(formClass.includes("add_course")){
        addCourseElm.className = "";
      }else{
        addCourseElm.className += "add_course";
      }      
    }    
  }

  // Hides or Displays Studednt add form when Add Student button is pressed by changing css property 
  toggleStudentForm(){
    let addStudentElm = document.getElementById("add_student");
    if(addStudentElm != null){
      let formClass = addStudentElm.className;
      if(formClass.includes("add_student")){
        addStudentElm.className = "";
      }else{
        addStudentElm.className += "add_student";
      }      
    }    
  }

  // Updates courseJson by inserting new course details
  addCourse(){
    let newCourseElm = document.getElementById("course_name");
    let newCourse = "";
    if(newCourseElm != null){
      newCourse = (<HTMLInputElement>newCourseElm).value;
      let temp = {
        "cId" : Math.floor(Math.random() * 999),
        "cName" : newCourse,
        "students": []
      }
      this.courseJson.courses.push(temp);
      this.selectedCourse = newCourse;
      this.toggleCourseForm();
    }
  }

  // Updates studentJson by inserting new student details and calls addStudentToCourse() to
  // update courseJson by adding new student to students list
  addStudent(){
    let newStudentElm = document.getElementById("student_name");
    let newStudent = "";
    if(newStudentElm != null){
      newStudent = (<HTMLInputElement>newStudentElm).value;
      let temp = {
        "sId" : Math.floor(Math.random() * 9999),
        "sName" : newStudent,
      }
      this.studentJson.students.push(temp);
      this.toggleStudentForm();
      this.addStudentToCourse(newStudent);
    }
  }

  // Updates courseJson by adding new student to students list
  addStudentToCourse(sname: any){
    let index=0;
    for(let course of this.courseJson.courses){
      if(course.cName === this.selectedCourse){
        this.courseJson.courses[index].students.push(sname);
        break;
      }
      index += 1;
    }
  }

  // Updates global selectedCourse and selectedStudents variables to update the students shown
  // in student dropdown list.
  selectCourse(event: any){
    this.selectedCourse = event.target.value;
    this.selectedStudents = [];
    for(let course of this.courseJson.courses){
      if(this.selectedCourse === course.cName){
        this.selectedStudents = course.students;
        break;
      }
    }
  }

}

