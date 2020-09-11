# nicer-foundation-alert

[Foundation alerts](http://foundation.zurb.com/docs/components/alert_boxes.html) are great. But sometimes, they are just a little bit too static.
 This module aims to make them feel a little bit more like the great [noty-Jquery-Plugin](https://github.com/needim/noty).
 
# Install

Just install via bower:

    bower install frickelbruder/nicer-foundation-alert
 
# Make it work

## CSS
Add the nicer-foundation-alert.css into the head of your html-document like this:

     <link rel="stylesheet" type="text/css" href="js/nicer-foundation-alert/css/style.css">
 
## JS 
Just load your foundation as normal. Just pour a little frickelbruder-magic on it:

    <script src="js/vendor/jquery.js"></script>
    <script src="js/foundation/foundation.js"></script>
    <script src="js/foundation/foundation.alert.js"></script>
    <script src="js/nicer-foundation-alert/js/nicerAlert.js"></script>
    
And don't forget your  

    $(document).foundation();
    
After that, you can call

    $(document).foundation('nicerAlert', 'alert', { "message": "I am an alert", "type": "info"});
    
The nicerAlert will take care of the new alert reflow-call.
    
# Configuration

- **position**:  
 Where the alerts should show up. Default is 'bottom-right'.  
    Possible values are 
    - 'top-left' 
    - 'top-center' 
    - 'top-right' 
    - 'middle-left' 
    - 'middle-center' 
    - 'middle-right' 
    - 'bottom-left' 
    - 'bottom-center' 
    - 'bottom-right'
    
- **containerId**:   
The container id in the dom. If you change this, don't forget to update your scss. Default value is 'nicer-alert-container'.

- **template**:  
This is the template of the alert-box. It needs to follow the rules of the [Foundation-dokumentation] (http://foundation.zurb.com/docs/components/alert_boxes.html)
  There should be a {type} and a {message}-Placeholder.
     
        <div data-alert class="alert-box {type} radius">{message}<a href="#" class="close">&times;</a></div>
    
- **showMax**:  
The maximum amount of alerts, which are allowed to be visible.

- **visibleTimer**:  
The time in milliseconds, an alert is showed on screen, until it is faded out. The user can still use the close-button on the alert.
 If this value is 0, the alert will stay forever. Default value is 2500.

- **containerWidth**:  
The width, without the unit. Default is 500

- **containerWidthUnit**:  
The unit of the above mentioned containerWidth-setting.
 
