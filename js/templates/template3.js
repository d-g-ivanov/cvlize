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
			/*activateClickSelection("aside", "no");
			activateClickSelection("main", "no");
			activateClickSelection(".nameSection h1", "yes");
			activateClickSelection(".nameSection p", "yes");
			activateClickSelection(".contactInfo", "yes");
			activateClickSelection(".contactInfo h1", "yes");
			activateClickSelection(".contactInfo li", "yes");
			activateClickSelection("main h2", "yes");
			activateClickSelection("#aboutMe", "yes");
			activateClickSelectionForSections(".mainWrapper div", "yes");
			activateClickSelectionForSections(".mainWrapper li", "yes");*/
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
	// about me section
	function aboutMe(firstName, lastName, role, message) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.role = role;
		this.message = message;
		
		this.addAboutMe = function() {
			$('.nameSection h1').prepend(
				$('<span>'+ this.firstName + '</span>').addClass('firstName formFilledOut')
			);
			$('.nameSection h1').append(
				$('<span>' + this.lastName + '</span>').addClass('lastName formFilledOut')
			);
			$('.nameSection').append(
				$('<p>' + this.role + '</p>').addClass('formFilledOut')
			);
			
			$('#aboutMe').append(
				$('<p>' + this.message + '</p>').addClass('formFilledOut')
			);
		}
	}
	
	// aside section/contact details
	function contactDetails(address, email, phone, site1, site2, site3) {
		this.address = address;
		this.email = email;
		this.phone = phone;
		this.site1 = site1;
		this.site2 = site2;
		this.site3 = site3;
		
		this.addContactInfo = function() {
			$('.myDetails').append(
				$('<li>' + this.address + '</li>').addClass('myaddress formFilledOut'),
				$('<li>'+ this.email + '</li>').addClass('myemail formFilledOut'),
				$('<li>' + this.phone + '</li>').addClass('myphone formFilledOut')
			);
			
			$('.mySites').show()
			$('.mySites').append(
				$('<li>' + this.site1 + '</li>').addClass('site1 formFilledOut'),
				$('<li>'+ this.site2 + '</li>').addClass('site2 formFilledOut'),
				$('<li>' + this.site3 + '</li>').addClass('site3 formFilledOut')
			);
			
			if (site1 === '' && site2 === '' && site3 === '') {
				$('.mySites').hide();
			} else if (site1 === '') {
				$('.site1').remove();
			} else if (site2 === '') {
				$('.site2').remove();
			} else if (site3 === '') {
				$('.site3').remove();
			}
		}
	}
	
	// education section
	function myLearning(degree, datesEdu, institution) {
		this.degree = degree;
		this.datesEdu = datesEdu;
		this.institution = institution;
		//this.description = description;
		
		this.addMyLearning = function() {
			
			var lrnExp = $('<section></section>').addClass('myLearning blockedLine formFilledOut').append(
				$('<div>' + this.institution + '</div>').addClass('institution'),
				$('<div>'+ this.degree + '</div>').addClass('degree'),
				$('<div>' + this.datesEdu + '</div>').addClass('datesEdu')
				//$('<div>' + this.description + '</div>').addClass('description')
			);
			
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
			
			var wrkExp = $('<section></section>').addClass('myExperience formFilledOut').append(
				$('<div>'+ this.occupation + '</div>').addClass('occupation'),
				$('<div>' + this.datesWork + '</div>').addClass('datesWork'),
				$('<div>' + this.employer + '</div>').addClass('employer cf'),
				$('<div>' + this.description + '</div>').addClass('description')
			);
			
			if ( $('.mainWrapper').find('.myExperience') === false ) {
				wrkExp.insertAfter('#forWork');
			} else {
				$(wrkExp).insertAfter( $('.myExperience').last() );
			}
		}
	}
	
	//key skills section
	function myKeySkills(skill1, skill2, skill3) {
		this.skill1 = skill1;
		this.skill2 = skill2;
		this.skill3 = skill3;
		
		this.addMyKeySkills = function() {
			$('.keySkills').show();
			$('.keySkills').append(
				$('<li>' + this.skill1 + '</li>').addClass('keyskill1 formFilledOut'),
				$('<li>' + this.skill2 + '</li>').addClass('keyskill2 formFilledOut'),
				$('<li>' + this.skill3 + '</li>').addClass('keyskill3 formFilledOut')
			);
			
			if (skill1 === '' && skill2 === '' && skill3 === '') {
				$('.keySkills').hide();
			} else if (skill1 === '') {
				$('.keyskill1').remove();
			} else if (skill2 === '') {
				$('.keyskill2').remove();
			} else if (skill3 === '') {
				$('.keyskill3').remove();
			}
		}
	}
	
	// skills section
	function mySkills(skillName) {
		this.skillName = skillName;
		
		this.addMySkill = function() {
			$('#mySkills ul').append(
					$('<li>' + skillName + '</li>').addClass('formFilledOut')
			);
		}
	}
	
/* BUTTONS */
	//////////////////////////////PERSONAL INFORMATION FORM//////////////////////////////////////
		//update template click
		$('#updateTemplate').on('click', function() {
				//hide defaultInfo
				$('.defaultInfo').css({display: 'none'});
				//remove existing
				$('.formFilledOut').remove();
				//add about me section
				var firstName = $('#aboutMeForm-1').val();
				var lastName = $('#aboutMeForm-2').val();
				var role = $('#aboutMeForm-3').val();
				var message = $('#aboutMeForm-4').val();
				var about = new aboutMe(firstName, lastName, role, message);
				about.addAboutMe();	
				//add contact details
				var myaddress = $('#contactDetailsForm-1').val();
				var myemail = $('#contactDetailsForm-2').val();
				var myphone = $('#contactDetailsForm-3').val();
				var site1 = $('#contactDetailsForm-4').val();
				var site2 = $('#contactDetailsForm-5').val();
				var site3 = $('#contactDetailsForm-6').val();

				var contacts = new contactDetails(myaddress, myemail, myphone, site1, site2, site3);
				contacts.addContactInfo();
				
				
				//add learning section
				$('#myLearningForm div').each(function() {
					var degree = $(this).find('input:eq(0)').val();
					var datesEdu = $(this).find('input:eq(1)').val();
					var institution = $(this).find('input:eq(2)').val();
					//var descriptionEdu = $(this).find('textarea').val();
					var education = new myLearning(degree, datesEdu, institution);
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
				//add key skills
				var keyskill1 = $('#myKeySkills-1').val();
				var keyskill2 = $('#myKeySkills-2').val();
				var keyskill3 = $('#myKeySkills-3').val();
				var keyskills = new myKeySkills(keyskill1, keyskill2, keyskill3);
				keyskills.addMyKeySkills();
				//add skills
				$('#mySkillsForm div').each(function() {
					var skillName = $(this).find('input').val();
					var toAddSkill = new mySkills(skillName);
					toAddSkill.addMySkill();
				});
				//Step 1 Fillout checked
				$('#fillOut span.checkMark').css({opacity: '1'});
				pageBuilder(defaulPermission);
		});
});





