let subjectstr = `
            <div class="subject">
        <input placeholder="Subject Title" class="subjectinput" />
        <input placeholder="Credits" class="subjectinput" />
        <select class="selector" name="grade" id="grade">
          <option value="aplus">A+</option>
          <option value="a">A</option>
          <option value="aminus">A-</option>
          <option value="bplus">B+</option>
          <option value="b">B</option>
          <option value="bminus">B-</option>
          <option value="cplus">C+</option>
          <option value="c">C</option>
          <option value="cminus">C-</option>
          <option value="dplus">D+</option>
          <option value="d">D</option>
          <option value="dminus">D-</option>
          <option value="f">F</option>
        </select>
        <select class="selector" name="level" id="level">
          <option value="Academic">Academic</option>
          <option value="Honors">Honors</option>
          <option value="AP">AP</option>
        </select>
        <span class="close"><i class="far fa-times-circle"></i></span>
      </div>`;

function addproject() {
  console.log("epic");
  const newDiv = $(subjectstr)
    .css("display", "none")
    .fadeIn(500);
  $("#subjects").append(newDiv)
  var closebtns = document.getElementsByClassName("close");
  closebtns[closebtns.length-1].addEventListener("click", function() {
    let ele = this.parentElement
    console.log(ele)
    $(ele).fadeOut(300, function() {
      ele.remove()
    })
  });

}
function submit() {
  let grades = [];
  let subjects = document.querySelectorAll(".subject");
  console.log(subjects);
  for (let i = 0; i < subjects.length; i++) {
    let subjectname = subjects[i].childNodes[1].value;
    let credits = parseInt(subjects[i].childNodes[3].value);
    let grade = subjects[i].childNodes[5].value;
    let level = subjects[i].childNodes[7].value;
    console.log(subjectname + "|" + credits + "|" + grade + "|" + level);
    grades.push({
      subject: subjectname,
      grade: grade,
      level: level,
      credits: credits
    });
  }
  fetch("data.json")
    .then(res => {
      return res.json();
    })
    .then(json => {
      let data = json;
      //sample grade object: {subject: "Calc  BC", grade: "bplus", level : "AP", credits: 5}
      let qualityPoints = 0;
      let creditsAttempted = 0;
      //calculate GPA
      for (let i = 0; i < grades.length; i++) {
        creditsAttempted += grades[i].credits;
        let gradeValue = getGradeValue(grades[i].level, grades[i].grade);
        qualityPoints += gradeValue * grades[i].credits;
      }
      console.log(qualityPoints);
      console.log(creditsAttempted);
    let gpa = (qualityPoints / creditsAttempted).toFixed(3)
    if(!isNaN(gpa)){
        Swal.fire(
  'Your GPA',
  'Your GPA is '+gpa+". This is based off of the EBHS Student Handbook. ",
  'success'
)
    }else{
      'Error',
  'Please make sure you filled out all fields and did not leave any blank ',
  'error'
    }

      function getGradeValue(level, grade) {
        return data[level][grade];
      }
    });
}
  var closebtns = document.getElementsByClassName("close");
  closebtns[closebtns.length-1].addEventListener("click", function() {
    let ele = this.parentElement
    console.log(ele)
    $(ele).fadeOut(300, function() {
      ele.remove()
    })
  });
