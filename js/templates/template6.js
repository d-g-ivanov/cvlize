$(document).ready( function() {
/* ResizeSENSOR Activation*/
	
	defaulPermission = "yes";
	pageBuilder(defaulPermission);
	var sensor = new ResizeSensor($('#myResume'), function() {
		pageBuilder(defaulPermission);
	});
	
	$('#fontChange button').click( function(){
		pageBuilder(defaulPermission);
	});
	
/* SELECT ELEMENTS */
		//make elements selectable
		function clickMe() {
			/*activateClickSelection("main", "no");
			activateClickSelection("aside", "no");
			activateClickSelection("aside .section1", "yes");
			activateClickSelection("aside .section2", "yes");
			activateClickSelection("aside p", "yes");
			activateClickSelection(".firstName", "yes");
			activateClickSelection(".lastName", "yes");
			activateClickSelection(".contactInfo", "yes");
			activateClickSelectionForSections(".mainWrapper *:not(aside) div", "yes");
			activateClickSelectionForSections("aside li, .mainWrapper li", "yes");
			//activateClickSelection("#myResume h1, .clonedPage h1", "yes");
			activateClickSelection("#myResume h2, .clonedPage h2", "yes");*/
			activateClick('.workArea *:not(.mainWrapper, section)', 'yes');
		};
		
		//sortable
		$('#sortableActivate-btn').click( function() {
			var buttonState = $('#sortableActivate-btn').text();
			if (buttonState === 'enable' ) {
				//change button text
				$('#sortableActivate-btn').text('disable');
				//turn select function off
				$('.workArea *').removeClass('personalizeMe').off('click');
				
				//remove pagination
				pageReset();
				sensor.detach();
				$('#myResume').perfectScrollbar();
				
				//wrap elements
				$('.myLearning, #forLearning').wrapAll('<div class="myLearningWrapper" />');
				//$('.myLearningWrapper').insertAfter('#forLearning');
				$('.myExperience, #forWork').wrapAll('<div class="myExperienceWrapper" />');
				//$('.myExperienceWrapper').insertAfter('#forWork');
				//make sortable
				$('aside ul, .mainWrapper ul, .myLearningWrapper, .myExperienceWrapper').sortable({cancel: 'h2', opacity: 0.8}).css( 'cursor', 'pointer' );
				$('.mainWrapper').sortable({handle: 'h2'}).css( 'cursor', 'pointer' );
			} else if (buttonState === 'disable' ) {
				//change button text
				$('#sortableActivate-btn').text('enable');
				//unwrap elements
				$('.myLearning').unwrap();
				$('.myExperience').unwrap();
				$('#myResume').scrollTop(0);
				//back to pagination
				$('#myResume').perfectScrollbar('destroy');
				new ResizeSensor($('#myResume'), function() {
					pageBuilder(defaulPermission);
				});

				//make elements selectable
				clickMe();
				//destroy sotable
				$('aside ul, .mainWrapper ul, .myLearningWrapper, .myExperienceWrapper, .mainWrapper').sortable('destroy').css( 'cursor', 'text' );
			}
		});
		
/* FORMS */

		$('#personalization').click(function() {
			//make elements selectable
			clickMe();		
		});
		
		
		
		
		
		

		
/* THE OBJECTS */
	
	// aside section/contact details
	function contactDetails(mybirth, myaddress, myphone, myemail) {
		this.mybirth = mybirth;
		this.myaddress = myaddress;
		this.myphone = myphone;
		this.myemail = myemail;
		
		this.addContactInfo = function() {
			$('.contactInfo ul').append(
				$('<li>' + this.mybirth + '</li>').addClass('mybirth formFilledOut'),
				$('<li>' + this.myaddress + '</li>').addClass('myaddress formFilledOut'),
				$('<li>' + this.myphone + '</li>').addClass('myphone formFilledOut'),
				$('<li>' + this.myemail + '</li>').addClass('myemail formFilledOut')
			);
			
			var arr = $('.contactInfo ul li');
			for (j=0; j<arr.length; j++) {
				if ( $(arr[j]).html() === '' ) {
					$(arr[j]).remove();
				}
			}
		}
	}
	
	// about me section
	function aboutMe(firstName, lastName, header, message) {
		this.firstName = firstName;
		this.lastName = lastName;		
		this.header = header;
		this.message = message;
		
		this.addAboutMe = function() {
			$('.nameSection h1').prepend(
				$('<span>'+ this.firstName + '</span>').addClass('firstName formFilledOut')
			);
			$('.nameSection h1').append(
				$('<span>' + this.lastName + '</span>').addClass('lastName formFilledOut')
			);
			
			$('#aboutMe').append(
				$('<h1>' + this.header + '</h1>').addClass('formFilledOut'),
				$('<p>' + this.message + '</p>').addClass('formFilledOut')
			);
		}
	}
	
	// education section
	function myLearning(degree, datesEdu, institution, description) {
		this.degree = degree;
		this.datesEdu = datesEdu;
		this.institution = institution;
		this.description = description;
		
		this.addMyLearning = function() {
			var div1 = $('<div></div>').append( $('<div>' + this.datesEdu + '</div>').addClass('datesWork') );
			var div2 = $('<div></div>').append( 
				$('<div>'+ this.degree + '</div>').addClass('occupation'),
				$('<div>' + this.institution + '</div>').addClass('employer'),
				$('<div>' + this.description + '</div>').addClass('description')				
			);
			
			var lrnExp = $('<section></section>').addClass('myLearning blockedLine formFilledOut').append( div1, div2 );
			
			if ( $('.mainWrapper').find('.myLearning') === false ) {
				$(lrnExp).insertAfter('#forLearning');
			} else {
				$(lrnExp).insertAfter( $('.myLearning').last() );
			}
		}
	}
	
	// work experience section
	function myExperience(occupation, datesWork, employer, description) {
		this.occupation = occupation;
		this.datesWork = datesWork;
		this.employer = employer;
		this.description = description;
		
		this.addMyExperience = function() {
			var div1 = $('<div></div>').append( $('<div>' + this.datesWork + '</div>').addClass('datesWork') );
			var div2 = $('<div></div>').append( 
				$('<div>'+ this.occupation + '</div>').addClass('occupation'),
				$('<div>' + this.employer + '</div>').addClass('employer'),
				$('<div>' + this.description + '</div>').addClass('description')				
			);
			
			var wrkExp = $('<section></section>').addClass('myExperience formFilledOut').append( div1, div2 );
			
			if ( $('.mainWrapper').find('.myExperience') === false ) {
				wrkExp.insertAfter('#forWork');
			} else {
				$(wrkExp).insertAfter( $('.myExperience').last() );
			}
		}
	}
	
	// skills section
	function mySkills(skillName) {
		this.skillName = skillName;
		
		this.addMySkill = function() {
			if (skillName !== '' ) {
				$('#mySkills ul').append(
						$('<li>' + skillName + '</li>').addClass('formFilledOut')
				);
			}
		}
	}
	
	// competences section
	function myCompetences(competenceName) {
		this.competenceName = competenceName;
		
		this.addMyCompetence = function() {
			if (competenceName !== '' ) {
				$('#keyCompetences ul').append(
					$('<li>' + competenceName + '</li>').addClass('formFilledOut')
				);
			}
		}
	}
	
/* BUTTONS */
	//////////////////////////////PERSONAL INFORMATION FORM//////////////////////////////////////
		//update template click
		$('#updateTemplate').on('click', function() {
				//hide defaultInfo
				$('.defaultInfo').hide();
				//remove existing
				$('.formFilledOut').remove();
				//add about me section
				var firstName = $('#aboutMeForm-1').val();
				var lastName = $('#aboutMeForm-2').val();
				var header = $('#aboutMeForm-3').val();
				var message = $('#aboutMeForm-4').val();
				var about = new aboutMe(firstName, lastName, header, message);
				about.addAboutMe();	
				
				
				//add contact details
				var mybirth = $('#contactDetailsForm-1').val();
				var myaddress = $('#contactDetailsForm-2').val();
				var myphone = $('#contactDetailsForm-3').val();
				var myemail = $('#contactDetailsForm-4').val();
				var contacts = new contactDetails(mybirth, myaddress, myphone, myemail);
				contacts.addContactInfo();
				
				
				
				
				//add learning section
				$('#myLearningForm div').each(function() {
					var degree = $(this).find('input:eq(0)').val();
					var datesEdu = $(this).find('input:eq(1)').val();
					var institution = $(this).find('input:eq(2)').val();
					var descriptionEdu = $(this).find('textarea').val();
					var education = new myLearning(degree, datesEdu, institution, descriptionEdu);
					education.addMyLearning();
				});
				//add work experience
				$('#myExperienceForm div').each(function() {
					var occupation = $(this).find('input:eq(0)').val();
					var datesWork = $(this).find('input:eq(1)').val();
					var employer = $(this).find('input:eq(2)').val();
					var descriptionWork = $(this).find('textarea').val();
					var workExperience = new myExperience(occupation, datesWork, employer, descriptionWork);
					workExperience.addMyExperience();
				});
				//add skills
				$('#mySkillsForm div').each(function() {
					var skillName = $(this).find('input').val();
					var toAddSkill = new mySkills(skillName);
					toAddSkill.addMySkill();
				});
				//add competences
				$('#myKeyCompetencesForm div').each(function() {
					var competenceName = $(this).find('input').val();
					var toAddCompetence = new myCompetences(competenceName);
					toAddCompetence.addMyCompetence();
				});
				//Step 1 Fillout checked
				$('#fillOut span.checkMark').css({opacity: '1'});
				
				//pageBuilder
				pageBuilder(defaulPermission);
		});


});





