/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

console.log=function(m){
    var $=jQuery;
    var log=$('#console');
    if(log.length==0){
        var log=$('<div></div>');
        log.attr('id', 'console');
        log.css({position:'fixed', bottom:0, width:'100%', height:'30%', overflow:'auto', background:'white'});
        $('body').append(log);
    }
    var message_wrapper=$('<div class="message"></div>');
    message_wrapper.text(JSON.stringify(m));
    log.append(message_wrapper);
    log.scrollTo(log.innerHeight());
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        (function($){
            $('#deviceready').append('<p id="jquery_wrapper">jQuery Loaded...</p>');
            $('#jquery_wrapper').click(function(){
               $(this).text('jQuery Working...'); 
               $.post("https://api.particle.io/oauth/token",{
                   	client_id : 'particle', 
                   	client_secret : 'particle', 
                   	grant_type : 'password', 
                   	username : 'travis@controlanything.com', 
                   	password : 'Spunky11'
               },
               function(){
                   	console.log("Post request sent");
               }).success(function(data){
                   	console.log(data);
               }).error(function(data){
                   	console.log("POST request error");
               });
            });
        })(jQuery);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
