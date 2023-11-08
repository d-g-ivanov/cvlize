//import template
		$('#import').click(function(event) {
			count = 2;
			$('#globalTemplating > section').fadeOut();
			$('#importTemplate').fadeIn();
			animateSliding(event);			
		});
		
		document.getElementById('import-template').addEventListener('change', function(){
			ReadFileAllBrowsers(document.getElementById('import-template'), CallBackFunction); 
		},false);
		var CallBackFunction = function(content)
		{
			alert(content);
		}
		

		//Tested in Mozilla Firefox browser, Chrome
		function ReadFileAllBrowsers(FileElement, CallBackFunction)
		{
		try
		{
			var file = FileElement.files[0];
			var contents_ = "";

			 if (file) {
				var reader = new FileReader();
				reader.readAsText(file, "UTF-8");
				reader.onload = function(evt)
				{
					var text_ = evt.target.result;
					//CallBackFunction(text_);
					
					//body style
					var body_style;
					if (text_.indexOf("<!--Start-->") > 0) {
						//get work area - the smarter way
						body_style = text_.slice(text_.indexOf("/*Start*/") + "/*Start*/".length, text_.indexOf('/*End*/'));
					} else {
					//get work area - the dumb way
						body_style = text_.slice(text_.indexOf("<body style='"), text_.indexOf("'><div class='pagination'>")).replace("<body style='", '');
					}
					
					document.body.style = body_style;

					//work area
					var workarea;
					if (text_.indexOf("<!--Start-->") > 0) {
						//get work area - the smarter way
						work_area = text_.slice(text_.indexOf("<!--Start-->") + "<!--Start-->".length, text_.indexOf('<!--End-->'));
					} else {
					//get work area - the dumb way
						work_area = text_.slice(text_.indexOf("<div class='workArea'>"), text_.indexOf('<script'));
						work_area = work_area.replace("<div class='workArea'>", '');
					}
					
					document.querySelector('.workArea').innerHTML = work_area;
				}
				reader.onerror = function (evt) {
					alert("Error reading file");
				}
			}
		}
		catch (Exception)
		 {
			var fall_back =  ieReadFile(FileElement.value);
			if(fall_back != false)
			{
				CallBackFunction(fall_back);
			}
		 }
		}
		
		//Reading files with Internet Explorer
		function ieReadFile(filename)
		{
		 try
		 {
			var fso  = new ActiveXObject("Scripting.FileSystemObject");
			var fh = fso.OpenTextFile(filename, 1);
			var contents = fh.ReadAll();
			fh.Close();
			return contents;
		 }
		 catch (Exception)
		  {
			alert(Exception);
			return false;
		  }
		 }



//scale wrapper
$('.workArea').wrap(function() {
	return "<div id='outer' class='outer--closed'></div>";
});

function wrapAdjust(elem, scaleFactor, container) {
	var innerwidth = $(elem).width();
        innerwidth = innerwidth * scaleFactor;
    var innerheight = $(elem).height();
        innerheight = innerheight * scaleFactor;
    $(container).css({
        'width': innerwidth + 'px',
        'height': innerheight + 'px'
    });
}

function getScale(elem) {
	var div = elem.css('transform');

	var values = div.split('(')[1];
	values = values.split(')')[0];
	values = values.split(',');

	var a = values[0];
	var b = values[1];

	var scale = Math.sqrt(a*a + b*b);
	
	return scale;
};

function resized( el, container ) {
	var scale = getScale( $(el) );
	wrapAdjust(el, scale, container);
}

$(window).on('resize', function() {
	resized( '.workArea', '#outer' );
	//resized( '#outer-templating > section:visible', '#outer-templating' );
});

//input files
var inputs = document.querySelectorAll( '.inputfile' );
Array.prototype.forEach.call( inputs, function( input )
{
	var label	 = input.nextElementSibling,
		labelVal = label.innerHTML;

	input.addEventListener( 'change', function( e )
	{
		var fileName = '';
		if( this.files && this.files.length > 1 )
			fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
		else
			fileName = e.target.value.split( '\\' ).pop();

		if( fileName )
			label.querySelector( 'span' ).innerHTML = fileName;
		else
			label.innerHTML = labelVal;
	});
});


// browserme
$('#htmlMe').on('click', function() {
	var stylesheet = '<style type="text/css">/* reset */ html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font:inherit;vertical-align:baseline}article,aside,footer,header,menu,nav,section{display:block}body{position:relative;width:100%;height:100%;background:#fff}ol,ul{list-style:none}a{text-decoration:none}.cf:after,.cf:before{content:"";display:table}.cf:after{clear:both}sup{vertical-align:super;font-size:50%}/*general*/div,main{display:block}*{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;text-size-adjust:none;-moz-text-size-adjust:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none}.cf{clear:both}body{background:#6C6C6C;font-size:12pt;width:100vw;height:100vh;overflow:hidden;}::selection{background:#F0D494;color:#fff}::-moz-selection{background:#F0D494;color:#8C8C8C}::-webkit-selection{background:#F0D494;color:#8C8C8C}div.workArea{position:relative;margin: 0;width:100%;height:100%;overflow:auto;}.workArea>div{position:relative;background:#f8f8f8;margin:30px auto;box-shadow:0 0 .5cm rgba(0,0,0,.5);overflow:hidden}div.A4.portrait{width:210mm;height:297mm}div.A4.landscape{width:297mm;height:210mm}div.Letter.portrait{width:216mm;height:279.4mm}div.Letter.landscape{width:279.4mm;height:216mm}div.Legal.portrait{width:216mm;height:355.6mm}div.Legal.landscape{width:355.6mm;height:216mm}div.A4.landscape.sortMeFunction,div.A4.portrait.sortMeFunction,div.Legal.landscape.sortMeFunction,div.Legal.portrait.sortMeFunction,div.Letter.landscape.sortMeFunction,div.Letter.portrait.sortMeFunction{height:auto}</style>';
	
	var stylesheet1_5 = '<style type="text/css">.pagination li a,.pagination-num,.pagination-text{display:inline-block}.pagination{position:fixed;top:0;right:0;width:20%;height:100%;font-size:2em;z-index:10}.pagination li a,.pagination ul{position:relative;margin:0 auto}.pagination ul{max-width:50%;top:50%;-webkit-transform:translate(0,-50%);-moz-transform:translate(0,-50%);-o-transform:translate(0,-50%);transform:translate(0,-50%)}.pagination li{width:100%;text-align:center}.pagination li a{height:2em;line-height:2em;color:#fff;font-family:Montserrat,sans-serif;font-size:1.5em;overflow:visile;transition:all .3s linear;-webkit-backface-visibility:hidden}.pagination li a:hover{color:#b22222;transform:scale(1.1)}.pagination-text{-webkit-transform:rotate(-90deg);-moz-transform:rotate(-90deg);-o-transform:rotate(-90deg);transform:rotate(-90deg);font-size:.5em;width:1em;text-align:center;margin-left:1px}.workArea>div{position:absolute;top:0;left:50%;-webkit-transform:-webkit-translate(-50%,0);-moz-transform:translate(-50%,0);-o-transform:translate(-50%,0);transform:translate(-50%,0)}.workArea>div:first-child{z-index:2}</style>';
	
	var stylesheet2 = '<style type="text/css">/* specific */' + $('head style:first').text() + '/* media */@media print{body{position:relative;height:auto; width:auto;}#globalTemplating,nav{display:none}div.workArea{margin:0;overflow:hidden;}.workArea>div{margin:0 auto;overflow:visible!important;position:relative;}.pagination{display:none;}}' + $('head style:last').text() + '</style>';
	
	var body_styles = document.body.style.cssText;
	//body_styles.replace('("', '(');
	//body_styles.replace('")', ')');
	
	var contentHTML = $('body .workArea').html();
	
	var script = '<script type="text/javascript">window.onload=function(){function m(a){var b=null;"A"==a.target.tagName?b=a.target.querySelector(".pagination-num"):"SPAN"==a.target.tagName&&(b=a.target.parentElement.querySelector(".pagination-num"));var c=parseFloat(b.textContent),d=document.querySelectorAll(".workArea > div");for(k=0;k<d.length;k++)d[k].style.zIndex="1";d[c-1].style.zIndex="2"}var a=document.querySelectorAll(".workArea > div"),b=["one","two","three","four","five","six","seven","eight","nine","ten"];if(a.length>1){for(i=0;i<a.length;i++){var c=document.createElement("LI"),d=document.createElement("A"),e=document.createElement("SPAN"),f=document.createElement("SPAN"),g=document.createTextNode(i+1),h=null;h=i<10?document.createTextNode(b[i]):document.createTextNode(""),e.className="pagination-num",e.appendChild(g),f.className="pagination-text",f.appendChild(h),d.href="#page"+(i+1),d.appendChild(e),d.appendChild(f),c.appendChild(d),document.getElementById("pagination-page_list").appendChild(c)}var l=document.querySelectorAll(".pagination a");for(j=0;j<l.length;j++)l[j].addEventListener("click",m)}};</script>';
	
	var htmlMe = "<!DOCTYPE html><html><head>" + stylesheet + stylesheet1_5 + stylesheet2 + "</head><body style='/*Start*/" + body_styles + "/*End*/'><div class='pagination'><ul id='pagination-page_list'></ul></div><div class='workArea'><!--Start-->" + contentHTML + "<!--End--></div>" + script + "</body></html>";
	
	var name = $('.nameSection:first h1').text();
	
	var fileSave = new Blob([htmlMe], {type: "text/plain;charset=utf-8"});
	saveAs(fileSave, name + "_browsermé_cvlize.html");
});

//add image	
		function encodeImageFileAsURL(toEncode, target) {

			var filesSelected = document.getElementById(toEncode).files;
			if (filesSelected.length > 0) {
			  var fileToLoad = filesSelected[0];

			  var fileReader = new FileReader();

			  fileReader.onload = function(fileLoadedEvent) {
				var srcData = fileLoadedEvent.target.result; // <--- data: base64

				var newImage = document.createElement('img');
				newImage.src = srcData;
				newImage.alt = 'photo';
				
				document.getElementById(target).innerHTML = newImage.outerHTML;
			  }
			  fileReader.readAsDataURL(fileToLoad);
			}
		};
		
		var imageListener = document.getElementById('aboutMeImage-0');
		
		if (imageListener !== null) {
			imageListener.addEventListener('change', function(event) {
				encodeImageFileAsURL('aboutMeImage-0', 'myImage');
			});
		}
		
		
		
//background image
	function imageChange () {
		var backgroundImageListener = document.getElementById('resumeBackgroundImage-0');

		if (backgroundImageListener !== null) {
			//backgroundImageListener.addEventListener('change', function(event) {
				//encodeImageFileAsURL('resumeBackgroundImage-0', 'body-background');
				var filesSelected = document.getElementById('resumeBackgroundImage-0').files;
				if (filesSelected.length > 0) {
				  var fileToLoad = filesSelected[0];
					//additional properties
					var backgroundRepeat = document.querySelector('input[name="backgroundRepeat"]:checked').value;
					
					var backgroundSize;
					if ( (document.querySelector('input[name="backgroundSizeCustom-w"]').value === '' || document.querySelector('input[name="backgroundSizeCustom-w"]').value === null) && (document.querySelector('input[name="backgroundSizeCustom-h"]').value === '' || document.querySelector('input[name="backgroundSizeCustom-h"]').value === null)) {
						backgroundSize = document.querySelector('input[name="backgroundSize"]:checked').value;
					} else {
						var width = document.querySelector('input[name="backgroundSizeCustom-w"]').value;
						var height = document.querySelector('input[name="backgroundSizeCustom-h"]').value;
						backgroundSize = width + ' ' + height;
					}
					
					var backgroundPosition_X;
					if ( document.querySelector('input[name="backgroundPositionCustom-x"]').value === '' || document.querySelector('input[name="backgroundPositionCustom-x"]').value === null ) {
						backgroundPosition_X = document.querySelector('input[name="backgroundPosition-x"]:checked').value;
					} else {
						backgroundPosition_X = document.querySelector('input[name="backgroundPositionCustom-x"]').value;
					}
					
					var backgroundPosition_Y
					if (document.querySelector('input[name="backgroundPositionCustom-y"]').value === '' || document.querySelector('input[name="backgroundPositionCustom-y"]').value === null) {
						backgroundPosition_Y = document.querySelector('input[name="backgroundPosition-y"]:checked').value;
					} else {
						backgroundPosition_Y = document.querySelector('input[name="backgroundPositionCustom-y"]').value;
					}
					
				  var fileReader = new FileReader();

				  fileReader.onload = function(fileLoadedEvent) {
					var srcData = fileLoadedEvent.target.result; // <--- data: base64
					document.body.style.backgroundImage = "url(" + srcData + ")";
					document.body.style.backgroundRepeat = backgroundRepeat;
					document.body.style.backgroundSize = backgroundSize;
					document.body.style.backgroundPosition = backgroundPosition_X + ' ' + backgroundPosition_Y;
				  }
				  fileReader.readAsDataURL(fileToLoad);
				}
			//});
		}
	}
	
	document.getElementById('customResumeImageButton-background').addEventListener('click', imageChange);

//remove background
document.getElementById('remove-background').addEventListener('click', function() {
	document.body.style = '';
}, false);
	
//IE add unsupported tags
  document.createElement('header');
  document.createElement('section');
  document.createElement('main');
  document.createElement('article');
  document.createElement('aside');
  document.createElement('nav');
  document.createElement('footer');

//main height
var doch = $('#myResume').innerHeight();
var asideh = $('aside').innerHeight();
$('main').css('height', doch-asideh);


/* RESIZE DETECTOR */
	function px2mm(px) {
		var d = $("<div/>").css({ position: 'absolute', top : '-1000mm', left : '-1000mm', height : '1000mm', width : '1000mm' }).appendTo('body');
		var px_per_mm = d.height() / 1000;
		d.remove();
		return px / px_per_mm;
	};
	
	function pageReset() {
		var feedBack = $('.clonedPage main section').detach();
		$('#myResume .mainWrapper').append(feedBack);
		$('.clonedPage').remove();
	}
	
	var sensor;
	var pageClone;
	var defaulPermission;
	function pageBuilder(permission) {
		
		//reset page
		pageReset();
		//scale
		$('.workArea').css('transform', 'scale(1)');
		
		//variables
		var container = document.getElementById("myResume");
		//var aside = document.getElementsByTagName("aside");
		var pageHeight = parseFloat($(container).css('height') );
		var pageHeightmm = px2mm( pageHeight );
		var pageBottomPadding = parseFloat( $('#myResume main').css('padding-bottom') );
		var pageBottomPaddingmm = px2mm( parseFloat( $('#myResume main').css('padding-bottom') ) );
		var actualPage = pageHeightmm - pageBottomPaddingmm;
		var scrollHeight = container.scrollHeight;
		var scrollHeightmm = px2mm(parseInt(scrollHeight));// - pageBottomPaddingmm;
		var pages = Math.ceil(scrollHeightmm/actualPage);
		var pageToCheck;
		var sectionsToCheck;

	//alert(pages + ' pages\n' + actualPage + ' page height\n' + pageBottomPaddingmm + ' padding\n' + scrollHeightmm + ' of scroll height');

		//check number of pages and clone
		if (pages > 1) {
			for (i = 1; i <= pages; i++) {
				//clone to create page
				pageClone = $(container).clone(true).attr( 'id','myResume' + i).addClass('clonedPage').appendTo('.workArea');
				
				//keep aside as needed
				if(permission === "yes") {
					$(pageClone).find('main section').remove();
				} else {
					$(pageClone).find('aside, main section').remove();
				}

				//determine current page
				if ( i === 1 ) {
					pageToCheck = container;
					sectionsToCheck = $(container).find('main section').get().reverse();
				} else {
					pageToCheck =  $('#myResume' + (i-1));
					sectionsToCheck = $('#myResume' + (i-1) + ' main section').get().reverse();
				}

				//move overflowing content to next page
				for (j=0;j<sectionsToCheck.length;j++) {
					if ( $(sectionsToCheck[j]).offset().top + $(sectionsToCheck[j]).innerHeight() > $(pageToCheck).offset().top + $(pageToCheck).innerHeight() - pageBottomPadding ) {						
						var el = $(sectionsToCheck[j]).detach();
						$('#myResume' + i + ' .mainWrapper').prepend(el);
					}
				}
				
				//check last element
				if ( i === 1 ) {
					lastElement = $(container).find('main .mainWrapper').children().last();
				} else {
					lastElement = $('#myResume' + (i-1) + ' main .mainWrapper').children().last();
				}

				//move section title, if needed
				if ( lastElement.attr('class') === 'headline' ) {
					var headline = lastElement.detach();
					$('#myResume' + i + ' .mainWrapper').prepend(headline);
				}
				
				//check if clone page is empty
				if ( $('#myResume' + i + ' .mainWrapper').children().length === 0 ) {
					$('#myResume' + i).remove();
				}
			}

			//re-height main
			var affected = $('.workArea > div');
			affected.each(function() {
				var doch = $(this).innerHeight();
				var asideh = $(this).find('aside').innerHeight();
				
				if( $(this).hasClass('A4') ) {
					$(this).find('main').css('height', (doch-asideh-1));
				} else {
					$(this).find('main').css('height', doch-asideh);
				}
				if (typeof asideh === 'object') {
					$(this).find('main').addClass('noAside');
				}
			});
		}
		
		//re-scale
		$('.workArea').css('transform', '');
		
		resized('.workArea', '#outer');
	};
	
//custom scrollbar	
$('body > div').perfectScrollbar({suppressScrollX: true, maxScrollbarLength: 500});
$('#globalTemplating').perfectScrollbar({suppressScrollX: true, maxScrollbarLength: 500});

$(window).resize(function() {
	$('body > div').perfectScrollbar('update');
	$('#globalTemplating').perfectScrollbar('update');
});

//change @page rule
var cssPagedMedia = (function () {
    var style = document.createElement('style');
    document.head.appendChild(style);
    return function (rule) {
        style.innerHTML = rule;
    };
}());

cssPagedMedia.size = function (combined) {
    cssPagedMedia('@page {margin: 0; size: ' + combined + ';}');
};

$('#printSave').on('click', function() {
	var pageSize = $('.pSize input[type="radio"]:checked').val();;
	var pageOrient = $('.pOrientation input[type="radio"]:checked').val();
	var combined = pageSize + ' ' + pageOrient;
	cssPagedMedia.size(combined);
});
	
/* FORMS */

//slide animation
		var count;
		function animateSliding(event) {
			$('.panelOpen li').removeClass('panelOpened');
			if (count % 2 == 0) {
				$('#globalTemplating').switchClass('globalTemplating--closed', 'globalTemplating--open', 400, 'easeInOutQuad');
				$('.panelOpen').switchClass('panelOpen--closed', 'panelOpen--open', 400, 'easeInOutQuad');
				$('#outer').switchClass('outer--closed', 'outer--open', 400, 'easeInOutQuad');
				
				$('#globalTemplating').perfectScrollbar('update');
				$(event.target).parents('li').addClass('panelOpened');
				
				$('body > div').perfectScrollbar('update');	
			} else {
				$('#globalTemplating').switchClass('globalTemplating--open', 'globalTemplating--closed', 400, 'easeInOutQuad');
				$('.panelOpen').switchClass('panelOpen--open', 'panelOpen--closed', 400, 'easeInOutQuad');
				$('#outer').switchClass('outer--open', 'outer--closed', 400, 'easeInOutQuad');
				
				$('body > div').scrollTop(0);
			}
			$('body > div').perfectScrollbar('update');
		}

	//OPEN/CLOSE FORM
		//close form
		$('.close-btn, #updateTemplate, #doneLayout').click(function(event) {
			$('.workArea *').removeClass('personalizeMe').removeAttr('contenteditable').off('click');
			count = 1;
			animateSliding(event);			
		});
		//change form
		$('#fillOut').click(function(event) {
			$('.workArea *').removeClass('personalizeMe');
			$('.workArea *').removeAttr('contenteditable');
			count = 2;
			$('#globalTemplating > section').fadeOut();
			$('#formContent').fadeIn();
			animateSliding(event);			
		});
		//change form
		$('#personalization').click(function(event) {
			count = 2;
			$('#globalTemplating > section').fadeOut();
			$('#personalizeContent').fadeIn();
			animateSliding(event);			
		});
		//change form
		$('#printSave').click(function(event) {
			count = 2;
			$('#globalTemplating > section').fadeOut();
			$('#getContent').fadeIn();
			animateSliding(event);			
		});
		
//FORM EFFECTS
		$('#globalTemplating').on('change', function() {
			// trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
					if (!String.prototype.trim) {
						(function() {
							// Make sure we trim BOM and NBSP
							var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
							String.prototype.trim = function() {
								return this.replace(rtrim, '');
							};
						})();
					}

					[].slice.call( document.querySelectorAll( 'input.input__field, textarea.input__field, select.input__field' ) ).forEach( function( inputEl ) {
						// in case the input is already filled..
						if( inputEl.value.trim() !== '' ) {
							classie.add( inputEl.parentNode, 'input--filled' );
						}

						// events:
						inputEl.addEventListener( 'focus', onInputFocus );
						inputEl.addEventListener( 'blur', onInputBlur );
					} );

					function onInputFocus( ev ) {
						classie.add( ev.target.parentNode, 'input--filled' );
					}

					function onInputBlur( ev ) {
						if( ev.target.value.trim() === '' ) {
							classie.remove( ev.target.parentNode, 'input--filled' );
						}
					}
		});
			
		//FORM CAROUSEL
		//grab the width and calculate left value
		var fill_out_section = "#formContent";
		var personalize_section = "#personalizeContent";
		var slideIndex = 1;
		var slideIndexPer = 1;
		showSlides(slideIndex, fill_out_section);
		showSlidesPer(slideIndex, personalize_section);

		function plusSlides(n, slide_elements) {
			if (slide_elements === fill_out_section) {
				showSlides(slideIndex += n, slide_elements);
			} else if (slide_elements === personalize_section) {
				showSlidesPer(slideIndexPer += n, slide_elements);
			}
		}
		
		function showSlides(n, slide_elements) {
			var i;
			var slides = document.querySelectorAll(slide_elements + ' fieldset');

			if (n > slides.length) {slideIndex = 1} 
			if (n < 1) {slideIndex = slides.length}
			for (i = 0; i < slides.length; i++) {
				slides[i].style.display = "none";
				slides[i].classList.add('fade');
			}

			slides[slideIndex-1].style.display = "block"; 
			
			document.querySelector(slide_elements + ' .currentField').textContent = slideIndex;
			document.querySelector(slide_elements + ' .totalFields').textContent = slides.length;
		}
		
		function showSlidesPer(n, slide_elements) {
			var i;
			var slides = document.querySelectorAll(slide_elements + ' section');

			if (n > slides.length) {slideIndexPer = 1} 
			if (n < 1) {slideIndexPer = slides.length}
			for (i = 0; i < slides.length; i++) {
				slides[i].style.display = "none";
				slides[i].classList.add('fade');
			}

			slides[slideIndexPer-1].style.display = "block"; 
			
			document.querySelector(slide_elements + ' .currentField').textContent = slideIndexPer;
			document.querySelector(slide_elements + ' .totalFields').textContent = slides.length;
		}
		
		//fill-out section
		document.querySelector(fill_out_section + ' .prev-slide').addEventListener('click', function(){
			plusSlides(-1, fill_out_section);
		}, false);

		document.querySelector(fill_out_section + ' .next-slide').addEventListener('click', function(){
			plusSlides(1, fill_out_section);
		}, false);
		
		
		//personalize section
		document.querySelector(personalize_section + ' .prev-slide').addEventListener('click', function(){
			plusSlides(-1, personalize_section);
		}, false);

		document.querySelector(personalize_section + ' .next-slide').addEventListener('click', function(){
			plusSlides(1, personalize_section);
		}, false);

		
/* BUTTONS */

		//printing
		$('#printMe').click(function() {
			$('.panelOpen li').removeClass('panelOpened');
			$('#globalTemplating').switchClass('globalTemplating--open', 'globalTemplating--closed', 0, 'easeInOutQuad');
			$('.panelOpen').switchClass('panelOpen--open', 'panelOpen--closed', 0, 'easeInOutQuad');
			$('#outer').switchClass('outer--open', 'outer--closed', 0, 'easeInOutQuad');
			$('body > div').scrollTop(0);
			window.print();
		});

	//////////////////////////////PERSONAL INFORMATION FORM//////////////////////////////////////
		//fill default info
		$('#fillDefault').click(function() {
			$('.workArea *').show();
			//remove existing
			$('.formFilledOut').remove();
			//show defaultInfo
			$('.defaultInfo').show();
			
			pageBuilder(defaulPermission);
		});












		
	/////Education section/////
		//add education duplicate
		var cloneTrackerEdu = 2;
		var i = 1;
		$('#myLearningForm button.addMore').click(function() {
			var clone = $('#myLearningForm div:eq(0)').clone( true ).addClass('cloned').appendTo('#myLearningForm');
			clone.find('.counterFor').text('Set ' + cloneTrackerEdu);
			
			clone.find('span.input').removeClass('input--filled').each(function() {
				$(this).children('input, textarea').attr('id', 'myLearningForm-' + i + '-clone' + cloneTrackerEdu).val('').end();
				$(this).children('label').attr('for', 'myLearningForm-' + i + '-clone' + cloneTrackerEdu);
				i++;
			});
			
			cloneTrackerEdu++;
			$('#globalTemplating').perfectScrollbar('update');
		});
		
		//delete cloned learning
		$('.deleteClonedLearning').click(function() {
			$(this).closest('div.cloned').remove();
			
			cloneTrackerEdu = 1;
			i = 1;
			
			$('#myLearningForm div').each(function() {
				$(this).find('.counterFor').text('Set ' + cloneTrackerEdu);
				$(this).find('span.input').each(function() {
					$(this).children('input, textarea').attr('id', 'myLearningForm-' + i + '-clone' + cloneTrackerEdu);
					$(this).children('label').attr('for', 'myLearningForm-' + i + '-clone' + cloneTrackerEdu);
					i++;
				});
				
				cloneTrackerEdu++;
			});	

			$('#globalTemplating').perfectScrollbar('update');
		});
	/////Work section/////
		//add work experience duplicate
		var cloneTrackerWork = 2;
		var j = 1;
		$('#myExperienceForm button.addMore').click(function() {
			var clone = $('#myExperienceForm div:eq(0)').clone( true ).addClass('cloned').appendTo('#myExperienceForm');
			clone.find('.counterFor').text('Set ' + cloneTrackerWork);
			
			clone.find('span.input').removeClass('input--filled').each(function() {
				$(this).children('input, textarea').attr('id', 'myExperienceForm-' + j + '-clone' + cloneTrackerWork).val('').end();
				$(this).children('label').attr('for', 'myExperienceForm-' + j + '-clone' + cloneTrackerWork);
			});
			
			cloneTrackerWork++;
			$('#globalTemplating').perfectScrollbar('update');
		});
		
		//delete cloned work experience
		$('.deleteClonedWork').click(function() {
			$(this).closest('div.cloned').remove();
			
			cloneTrackerWork = 1;
			j = 1;
			
			$('#myExperienceForm div').each(function() {
				$(this).find('.counterFor').text('Set ' + cloneTrackerWork);
				$(this).find('span.input').each(function() {
					$(this).children('input, textarea').attr('id', 'myExperienceForm-' + j + '-clone' + cloneTrackerWork);
					$(this).children('label').attr('for', 'myExperienceForm-' + j + '-clone' + cloneTrackerWork);
					j++;
				});
				
				cloneTrackerWork++;
			});
			
			$('#globalTemplating').perfectScrollbar('update');
		});
	/////Skills section/////
		//add skill duplicate
		var skillClick = 2;
		$('#mySkillsForm button.addMore').click(function() {
			var clone = $('#mySkillsForm div:eq(0)').clone( true ).addClass('cloned').appendTo('#mySkillsForm');
			clone.find('span.input').removeClass('input--filled');
			clone.find('input').attr('id', 'mySkills-' + skillClick).val('').end();
			clone.find('label').attr('for', 'mySkills-' + skillClick);
			clone.find('span.input__label-content').text('Skill ' + skillClick);
			skillClick++;
			$('#globalTemplating').perfectScrollbar('update');
		});
		
		//delete cloned skills
		$('.deleteClonedSkill').click(function() {
			$(this).closest('div.cloned').remove();
			
			skillClick = 1;
			
			$('#mySkillsForm div').each(function() {
				$(this).find('input').attr('id', 'mySkills-' + skillClick);
				$(this).find('label').attr('for', 'mySkills-' + skillClick);
				$(this).find('span.input__label-content').text('Skill ' + skillClick);
				skillClick++;
			});
			$('#globalTemplating').perfectScrollbar('update');
		});
		
		//2add skill section
		/*var skillClick2 = 2;
		$('#mySkillsForm2 button.addMore').click(function() {
			var clone = $('#mySkillsForm2 div:eq(0)').clone( true ).addClass('cloned').appendTo('#mySkillsForm2');
			
			clone.find('span.input:eq(' + i + ')').removeClass('input--filled');
			clone.find('input').attr('id', 'mySkills-' + skillClick2).val('').end();
			clone.find('input:eq(0)').attr('id', 'mySkills-header' + skillClick2).val('').end();
			clone.find('label').attr('for', 'mySkills-' + skillClick2);
			clone.find('label:eq(0)').attr('for', 'mySkills-header' + skillClick2);
			clone.find('span.input__label-content').text('Skill name');
			clone.find('span.input__label-content:eq(0)').text('Skill header');
			skillClick2++;
			clone.find('span.input').not('span:first, span:nth-child(2)').remove();
			$('#globalTemplating').perfectScrollbar('update');
		});*/
		
		var skillClick2 = 2;
		$('#mySkillsForm2 button.addMore').click(function() {
			var clone = $('#mySkillsForm2 div:eq(0)').clone( true ).addClass('cloned').appendTo('#mySkillsForm2');
			clone.find('span.input').not('span:first, span:nth-child(2)').remove();
			clone.find('span.input').removeClass('input--filled');
					
					clone.find('input:eq(0)').attr('id', 'mySkills-header' + skillClick2).val('').end();
					clone.find('label:eq(0)').attr('for', 'mySkills-header' + skillClick2);
					clone.find('span.input__label-content:eq(0)').text('Skill header');
				
					clone.find('input:eq(1)').attr('id', 'mySkills-' + skillClick2).val('').end();
					clone.find('label:eq(1)').attr('for', 'mySkills-' + skillClick2);
					clone.find('span.input__label-content:eq(1)').text('Skill name');
				
			skillClick2++;
			$('#globalTemplating').perfectScrollbar('update');
		});
		
		//2add skill duplicate
		var skillAdd2 = 2;
		$('#mySkillsForm2 button.addClone2').click(function() {
			var parentEl = $(this).parents('div');
			var clone = $('#mySkillsForm2 div:eq(0) span.input:eq(1)').clone( true ).addClass('cloned').appendTo(parentEl);
			clone.find('span.input').removeClass('input--filled');
			clone.find('input').attr('id', 'mySkills-' + skillAdd2).val('').end();
			clone.find('label').attr('for', 'mySkills-' + skillAdd2);
			clone.find('span.input__label-content').text('Skill name');
			skillAdd2++;
			$('#globalTemplating').perfectScrollbar('update');
		});
		
		//2delete cloned skills
		$('.deleteClonedSkill').click(function() {
			$(this).closest('div.cloned').remove();
			
			skillClick2 = 1;
			
			$('#mySkillsForm2 div').each(function() {
				$(this).find('input:eq(0)').attr('id', 'mySkills-header' + skillClick2);
				$(this).find('label:eq(0)').attr('for', 'mySkills-header' + skillClick2);
				$(this).find('span.input__label-content:eq(0)').text('Skill header');
				
				for(i=1; i<=$('#mySkillsForm2 div').find('span.input').length; i++) {
					$(this).find('input:eq(' + i + ')').attr('id', 'mySkills-' + skillClick2 + '-' + i );
					$(this).find('label:eq(' + i + ')').attr('for', 'mySkills-' + skillClick2 + '-' + i);
					$(this).find('span.input__label-content:eq(' + i + ')').text('Skill name');
				}
				skillClick2++;
			});
			$('#globalTemplating').perfectScrollbar('update');
		});	
		
		/*$('.deleteClonedSkill').click(function() {
			$(this).closest('div.cloned').remove();
			
			skillClick2 = 1;
			
			$('#mySkillsForm2 div').each(function() {
				$(this).find('input').attr('id', 'mySkills-' + skillClick2);
				$(this).find('input:eq(0)').attr('id', 'mySkills-header' + skillClick2).val('').end();
				$(this).find('label').attr('for', 'mySkills-' + skillClick2);
				$(this).find('label:eq(0)').attr('for', 'mySkills-header' + skillClick2);
				$(this).find('span.input__label-content').text('Skill name');
				$(this).find('span.input__label-content:eq(0)').text('Skill header');
				skillClick2++;
			});
			$('#globalTemplating').perfectScrollbar('update');
		});	*/
	/////Competences section/////	
		//add competence duplicate
		var competenceClick = 2;
		$('#myKeyCompetencesForm button.addMore').click(function() {
			var clone = $('#myKeyCompetencesForm div:eq(0)').clone( true ).addClass('cloned').appendTo('#myKeyCompetencesForm');
			clone.find('span.input').removeClass('input--filled');
			clone.find('input').attr('id', 'myKeyCompetence-' + competenceClick).val('').end();
			clone.find('label').attr('for', 'myKeyCompetence-' + competenceClick);
			clone.find('span.input__label-content').text('Area ' + competenceClick);
			competenceClick++;
			$('#globalTemplating').perfectScrollbar('update');
		});
		
		//delete cloned competence
		$('.deleteClonedCompetence').click(function() {
			$(this).closest('div.cloned').remove();
			
			competenceClick = 1;
			
			$('#myKeyCompetencesForm div').each(function() {
				$(this).find('input').attr('id', 'myKeyCompetence-' + competenceClick);
				$(this).find('label').attr('for', 'myKeyCompetence-' + competenceClick);
				$(this).find('span.input__label-content').text('Area ' + competenceClick);
				competenceClick++;
			});
			$('#globalTemplating').perfectScrollbar('update');
		});
	/////References section/////
		//add reference duplicate
		var referenceClick = 2;
		$('#myReferencesForm button.addMore').click(function() {
			var clone = $('#myReferencesForm div:eq(0)').clone( true ).addClass('cloned').appendTo('#myReferencesForm');
			clone.find('span.input').removeClass('input--filled');
			clone.find('input').attr('id', 'myReferences-' + referenceClick).val('').end();
			clone.find('label').attr('for', 'myReferences-' + referenceClick);
			clone.find('span.input__label-content').text('Reference ' + referenceClick);
			referenceClick++;
			$('#globalTemplating').perfectScrollbar('update');
		});
		
		//delete cloned reference
		$('.deleteClonedReference').click(function() {
			$(this).closest('div.cloned').remove();
			
			referenceClick = 1;
			
			$('#myReferencesForm div').each(function() {
				$(this).find('input').attr('id', 'myReferences-' + referenceClick);
				$(this).find('label').attr('for', 'myReferences-' + referenceClick);
				$(this).find('span.input__label-content').text('Reference ' + referenceClick);
				referenceClick++;
			});
			$('#globalTemplating').perfectScrollbar('update');
		});
	/////Languages section/////
		//add language duplicate
		var cloneTrackerLang = 2;
		var currentID;
		var name;
		$('#myLanguagesForm button.addMore').click(function() {
			//get original checked radio
			var original = $('#myLanguagesForm div:eq(0)').find(':checked');
			//clone
			var clone = $('#myLanguagesForm div:eq(0)').clone( true ).addClass('cloned').appendTo('#myLanguagesForm');
			clone.find('.counterFor').text('Set ' + cloneTrackerLang);
			//reset cloned elements' attributes
			clone.find('span.input, li').removeClass('input--filled').each(function() {
				currentID = $(this).find('input').attr('id');
				name = $(this).find('input').attr('name');
				$(this).children('input:not([type=radio])').attr({id: currentID + '-clone' + cloneTrackerLang, name: name +'-clone' + cloneTrackerLang}).val('').end();
				$(this).children('input[type=radio]').attr({id: currentID + '-clone' + cloneTrackerLang, name: name +'-clone' + cloneTrackerLang}).prop('checked', false).end();
				$(this).children('label').attr('for', currentID + '-clone' + cloneTrackerLang);
			});
			//restore original checked
			if (original.length > 0) {
				original.prop('checked',true);
			}
			//other required steps
			cloneTrackerLang++;
			$('#globalTemplating').perfectScrollbar('update');
		});
		
		//delete cloned language
		$('.deleteClonedLang').click(function() {
			$(this).closest('div.cloned').remove();
			cloneTrackerLang = 2;
			$('#myLanguagesForm div:not(:first-of-type)').each(function() {
				$(this).find('.counterFor').text('Set ' + cloneTrackerLang);
				$(this).find('span.input, li').each(function() {
					currentID = $(this).find('input').attr('id');
					name = $(this).find('input').attr('name');
					$(this).children('input').attr({id: currentID + '-clone' + cloneTrackerLang, name: name +'-clone' + cloneTrackerLang});
					$(this).children('label').attr('for', currentID + '-clone' + cloneTrackerLang);
				});

				cloneTrackerLang++;
			});	

			$('#globalTemplating').perfectScrollbar('update');
		});
	/////Communication skills section/////
		//add comm skill duplicate
		var commClick = 2;
		$('#myCommSkillsForm button.addMore').click(function() {
			var clone = $('#myCommSkillsForm div:eq(0)').clone( true ).addClass('cloned').appendTo('#myCommSkillsForm');
			clone.find('span.input').removeClass('input--filled');
			clone.find('input').attr('id', 'myCommSkills-' + commClick).val('').end();
			clone.find('label').attr('for', 'myCommSkills-' + commClick);
			clone.find('span.input__label-content').text('Communication skill ' + commClick);
			commClick++;
			$('#globalTemplating').perfectScrollbar('update');
		});
		
		//delete cloned comm skill
		$('.deleteClonedCommSkill').click(function() {
			$(this).closest('div.cloned').remove();
			
			commClick = 1;
			
			$('#myCommSkillsForm div').each(function() {
				$(this).find('input').attr('id', 'myCommSkills-' + commClick);
				$(this).find('label').attr('for', 'myCommSkills-' + commClick);
				$(this).find('span.input__label-content').text('Communication skill ' + commClick);
				commClick++;
			});
			$('#globalTemplating').perfectScrollbar('update');
		});
	/////Organizational skills section/////
		//add org skill duplicate
		var orgClick = 2;
		$('#myOrgSkillsForm button.addMore').click(function() {
			var clone = $('#myOrgSkillsForm div:eq(0)').clone( true ).addClass('cloned').appendTo('#myOrgSkillsForm');
			clone.find('span.input').removeClass('input--filled');
			clone.find('input').attr('id', 'myOrgSkills-' + orgClick).val('').end();
			clone.find('label').attr('for', 'myOrgSkills-' + orgClick);
			clone.find('span.input__label-content').text('Organizational skill ' + orgClick);
			orgClick++;
			$('#globalTemplating').perfectScrollbar('update');
		});
		
		//delete cloned org skill
		$('.deleteClonedOrgSkill').click(function() {
			$(this).closest('div.cloned').remove();
			
			orgClick = 1;
			
			$('#myOrgSkillsForm div').each(function() {
				$(this).find('input').attr('id', 'myOrgSkills-' + orgClick);
				$(this).find('label').attr('for', 'myOrgSkills-' + orgClick);
				$(this).find('span.input__label-content').text('Organizational skill ' + orgClick);
				orgClick++;
			});
			$('#globalTemplating').perfectScrollbar('update');
		});
	/////Job-related skills section/////
		//add job skill duplicate
		var jobClick = 2;
		$('#myJobSkillsForm button.addMore').click(function() {
			var clone = $('#myJobSkillsForm div:eq(0)').clone( true ).addClass('cloned').appendTo('#myJobSkillsForm');
			clone.find('span.input').removeClass('input--filled');
			clone.find('input').attr('id', 'myJobSkills-' + jobClick).val('').end();
			clone.find('label').attr('for', 'myJobSkills-' + jobClick);
			clone.find('span.input__label-content').text('Job-related skill ' + jobClick);
			jobClick++;
			$('#globalTemplating').perfectScrollbar('update');
		});
		
		//delete cloned job skill
		$('.deleteClonedJobSkill').click(function() {
			$(this).closest('div.cloned').remove();
			
			jobClick = 1;
			
			$('#myJobSkillsForm div').each(function() {
				$(this).find('input').attr('id', 'myJobSkills-' + jobClick);
				$(this).find('label').attr('for', 'myJobSkills-' + jobClick);
				$(this).find('span.input__label-content').text('Job-related skill ' + jobClick);
				jobClick++;
			});
			$('#globalTemplating').perfectScrollbar('update');
		});
	
	
	/////Computer skills section/////
		//add computer skill duplicate
		var compClick = 2;
		$('#myDigitalCompForm button.addMore').click(function() {
			var clone = $('#myDigitalCompForm div:eq(0)').clone( true ).addClass('cloned').appendTo('#myDigitalCompForm');
			clone.find('span.input').removeClass('input--filled');
			clone.find('input').attr('id', 'compSkills-' + compClick).val('').end();
			clone.find('label').attr('for', 'compSkills-' + compClick);
			clone.find('span.input__label-content').text('Skill ' + compClick);
			compClick++;
			$('#globalTemplating').perfectScrollbar('update');
		});
		
		//delete cloned computer skill
		$('.deleteClonedCompSkill').click(function() {
			$(this).closest('div.cloned').remove();
			
			compClick = 1;
			
			$('#myDigitalCompForm div').each(function() {
				$(this).find('input').attr('id', 'compSkills-' + compClick);
				$(this).find('label').attr('for', 'compSkills-' + compClick);
				$(this).find('span.input__label-content').text('Skill ' + compClick);
				compClick++;
			});
			$('#globalTemplating').perfectScrollbar('update');
		});
	/////Other skills section/////
		//add other skill duplicate
		var otherClick = 2;
		$('#myOtherSkillsForm button.addMore').click(function() {
			var clone = $('#myOtherSkillsForm div:eq(0)').clone( true ).addClass('cloned').appendTo('#myOtherSkillsForm');
			clone.find('span.input').removeClass('input--filled');
			clone.find('input').attr('id', 'myOtherSkills-' + otherClick).val('').end();
			clone.find('label').attr('for', 'myOtherSkills-' + otherClick);
			clone.find('span.input__label-content').text('Other skill ' + otherClick);
			otherClick++;
			$('#globalTemplating').perfectScrollbar('update');
		});
		
		//delete cloned other skill
		$('.deleteClonedOtherSkill').click(function() {
			$(this).closest('div.cloned').remove();
			
			otherClick = 1;
			
			$('#myOtherSkillsForm div').each(function() {
				$(this).find('input').attr('id', 'myOtherSkills-' + otherClick);
				$(this).find('label').attr('for', 'myOtherSkills-' + otherClick);
				$(this).find('span.input__label-content').text('Other skill ' + otherClick);
				otherClick++;
			});
			$('#globalTemplating').perfectScrollbar('update');
		});
	
	
	
	/////Additional information section/////
		//add additional info duplicate
		var addInfoClick = 2;
		$('#myAddInfoForm button.addMore').click(function() {
			var clone = $('#myAddInfoForm div:eq(0)').clone( true ).addClass('cloned').appendTo('#myAddInfoForm');
			clone.find('span.input').removeClass('input--filled');
			clone.find('input').attr('id', 'myAddInfo-' + addInfoClick).val('').end();
			clone.find('label').attr('for', 'myAddInfo-' + addInfoClick);
			clone.find('span.input__label-content').text('Details ' + addInfoClick);
			addInfoClick++;
			$('#globalTemplating').perfectScrollbar('update');
		});
		
		//delete cloned additional info
		$('.deleteClonedAddInfo').click(function() {
			$(this).closest('div.cloned').remove();
			
			addInfoClick = 1;
			
			$('#myAddInfoForm div').each(function() {
				$(this).find('input').attr('id', 'myAddInfo-' + addInfoClick);
				$(this).find('label').attr('for', 'myAddInfo-' + addInfoClick);
				$(this).find('span.input__label-content').text('Details ' + addInfoClick);
				addInfoClick++;
			});
			$('#globalTemplating').perfectScrollbar('update');
		});
	/////Annexes section/////
		//add annexes duplicate
		var annexClick = 2;
		$('#myAnnexesForm button.addMore').click(function() {
			var clone = $('#myAnnexesForm div:eq(0)').clone( true ).addClass('cloned').appendTo('#myAnnexesForm');
			clone.find('span.input').removeClass('input--filled');
			clone.find('input').attr('id', 'myAddInfo-' + annexClick).val('').end();
			clone.find('label').attr('for', 'myAddInfo-' + annexClick);
			clone.find('span.input__label-content').text('Annex ' + annexClick);
			annexClick++;
			$('#globalTemplating').perfectScrollbar('update');
		});
		
		//delete cloned annex
		$('.deleteClonedAnnex').click(function() {
			$(this).closest('div.cloned').remove();
			
			annexClick = 1;
			
			$('#myAnnexesForm div').each(function() {
				$(this).find('input').attr('id', 'myAddInfo-' + annexClick);
				$(this).find('label').attr('for', 'myAddInfo-' + annexClick);
				$(this).find('span.input__label-content').text('Annex ' + annexClick);
				annexClick++;
			});
			$('#globalTemplating').perfectScrollbar('update');
		});
	
	/////Others section/////
		//add others duplicate
		var othersClick = 2;
		$('#myOthersForm button.addMore').click(function() {
			var clone = $('#myOthersForm div:eq(0)').clone( true ).addClass('cloned').appendTo('#myOthersForm');
			clone.find('span.input').removeClass('input--filled');
			clone.find('input').attr('id', 'myOther-' + othersClick).val('').end();
			clone.find('label').attr('for', 'myOther-' + othersClick);
			clone.find('span.input__label-content').text('Other info ' + othersClick);
			othersClick++;
			$('#globalTemplating').perfectScrollbar('update');
		});
		
		//delete cloned annex
		$('.deleteClonedOther').click(function() {
			$(this).closest('div.cloned').remove();
			
			othersClick = 1;
			
			$('#myOthersForm div').each(function() {
				$(this).find('input').attr('id', 'myOther-' + othersClick);
				$(this).find('label').attr('for', 'myOther-' + othersClick);
				$(this).find('span.input__label-content').text('Other info ' + othersClick);
				othersClick++;
			});
			$('#globalTemplating').perfectScrollbar('update');
		});
	
	
	
	







	
	//////////////////////////////PERSONALIZE FORM//////////////////////////////////////	
	/////Keep aside section/////
		$('#hO1').click(function(){
			if ( $('#hO1').is(':checked') ) {
				defaulPermission = "yes";
			} else {
				defaulPermission = "no";
			}
			//run pagination
			pageBuilder(defaulPermission);
		});
	
	/////Paper choice section/////
		//paper size
		$('.pSize input').click( function() {
			var pSize = $(this).val();
			$('#myResume').removeClass('A4 Letter Legal');
			$('#myResume').addClass(pSize);
		});
		
		//portrait
		$('#portraitChange').click(function(){
			$('#myResume').removeClass('landscape').addClass('portrait');
		});
		
		//landscape
		$('#landscapeChange').click(function(){
			$('#myResume').removeClass('portrait').addClass('landscape');
		});
	/////Font change section/////
		//sort alphabetically
	var my_options = $("#customFontFamily option");
	var selected = $("#customFontFamily").val();

	my_options.sort(function(a,b) {
		if (a.text > b.text) return 1;
		if (a.text < b.text) return -1;
		return 0
	})

	$("#customFontFamily").empty().append( my_options );
	$("#customFontFamily").val(selected);
		
		//delete selected element
		$('#delete-selected-btn').click( function() {
			$('.personalizeMe').remove();
		});
		
		//font family
		$('#customFontFamily > option').each( function() {
			var fontType = $(this).val();
			$(this).css({'font-family': fontType});
		});

		$('#customFontFamily-btn').click( function() {
			var fontFamily = $('select#customFontFamily option:selected').val();
			$('.personalizeMe').css({'font-family': fontFamily});
		});

		//font size
		$('#customFontSize-btn').click( function() {
			var fontSize = $('input#customFontSize').val();
			$('.personalizeMe').css({'font-size': fontSize + 'pt'});
		});

		//line height
		$('#customLineHeight-btn').click( function() {
			var lineHeight = $('input#customLineHeight').val();
			$('.personalizeMe').css({'line-height': lineHeight});
		});

		//font type change
		//normal
		$('#normalizeMe').click( function() {
			$('.personalizeMe').css({'font-weight': 'normal', 'font-style': 'normal', 'text-decoration': 'none'});
		});

		//bold
		$('#boldMe').click( function() {
			$('.personalizeMe').css({'font-weight': 'bold'});
		});

		//italics
		$('#italicsMe').click( function() {
			$('.personalizeMe').css({'font-style': 'oblique'});
		});

		//underline
		$('#underlineMe').click( function() {
			$('.personalizeMe').css({'text-decoration': 'underline'});
		});

		//overline
		$('#overlineMe').click( function() {
			$('.personalizeMe').css({'text-decoration': 'overline'});
		});

		//line-through
		$('#line-thru-Me').click( function() {
			$('.personalizeMe').css({'text-decoration': 'line-through'});
		});
	/////Color changes section/////
		//font color tiles
		$('#fontColor label').each(function() {
			var color = $(this).attr('for');
			$(this).css('background-color', color);
		});

		//font color change
		$('#fontColor label').click( function() {
			$('input#customColor-font').val('');
			$('#fontColor li.special span.input').removeClass('input--filled');
			var ftColor = $(this).attr('for');
			$('.personalizeMe').css({'color': ftColor});
		});
			//check custom color field
		$('#customColorButton-font').click( function() {
			$('#fontColor input[type="radio"]:checked').each( function() {
				this.checked = false;
			});
			var ftColor = $('input#customColor-font').val();
			$('.personalizeMe').css({'color': ftColor});
		});

		//background colors
		//background color tiles
		$('#backgroundColor label, #resumeBackground label').each(function() {
			var color = $(this).attr('for');
			$(this).css('background-color', color);
		});

		//background color change
		$('#backgroundColor label').click( function() {
			$('input#customColor-background').val('');
			$('#fontColor li.special span.input').removeClass('input--filled');
			var bgColor = $(this).attr('for');
			$('.personalizeMe').css({'background-color': bgColor});
		});

		$('#customColorButton-background').click( function() {
			$('#backgroundColor input[type="radio"]:checked').each( function() {
				this.checked = false;
			});
			var bgColor = $('input#customColor-background').val();
			$('.personalizeMe').css({'background-color': bgColor});
		});
		
		//background color change for resume
		$('#resumeBackground label').click( function() {
			$('input#customresumeColor-background').val('');
			$('#fontColor li.special span.input').removeClass('input--filled');
			var bgColor = $(this).attr('for');
			$('body').css({'background-color': bgColor});
		});

		$('#customResumeColorButton-background').click( function() {
			$('#backgroundColor input[type="radio"]:checked').each( function() {
				this.checked = false;
			});
			var bgColor = $('input#customResumeColor-background').val();
			$('body').css({'background-color': bgColor});
		});
	/////Personalization done/////
		//done with layout changes
		$('#doneLayout').click( function() {
			$('#personalization span.checkMark').css({opacity: '1'});
		});
		
	
/* SELECT ELEMENTS */
//make elements selectable
function activateClick(element, status) {
	$(element).click( function(event) {
		if (status === 'yes') {
			event.stopPropagation();
		}
		
		$(this).toggleClass('personalizeMe');
		
		if ($(this).hasClass('personalizeMe')) {
			$(this).prop('contenteditable', true);
			$(this).focus();
		} else {
			$(this).removeAttr('contenteditable');
		}
	});
};

/*function activateClickSelection(element, status) {
	var selectorClicks = 1;
	$(element).click( function(event) {
		if (status === 'yes') {
			event.stopPropagation();
		}

		selectorClicks++;
		if (selectorClicks % 2 === 0) {
			$(element).addClass('personalizeMe');
			
			if($(this).children().length == 0) {
				$(this).prop('contenteditable', true);
				$(this).focus();
			} /*else {
				$(element + ' *:not(:has(*))').prop('contenteditable', true);
				$(element + ' *:not(:has(*))').focus();
			}
		} else {
			$(element).removeClass('personalizeMe');
			$(element).removeAttr('contenteditable');
		}
	});
};

//section special
function activateClickSelectionForSections(element, status) {
	var elem = $(element);
	var el = [];
	
	for (i=0; i<=elem.length; i++) {
		el[i] = 1;
	}

	$(element).click( function(event) {
		if (status === 'yes') {
			event.stopPropagation();
		}
		
		var indexMe = $(elem).index( $(element) );
		el[indexMe]++;
		
		if (el[indexMe] % 2 === 0) {
			$(this).addClass('personalizeMe');
			
			if($(this).children().length == 0) {
				$(this).prop('contenteditable', true);
				$(this).focus();
			}
		} else {
			$(this).removeClass('personalizeMe');
			$(this).removeAttr('contenteditable');
		}
	});
};*/



