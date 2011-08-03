(function($){

    $.fn.awsm_tip = function(options){
      
      
      // set default options
      var defaults = {
          wrapperClass : 'awsm-tip' ,
          hoverDelay : 300 ,
          speed : 'fast' ,
          distance : 20 ,
          padLeft : 0 ,
      };
      
      
      // call in default options 
      var options = $.extend(defaults,options) ;
      var elm_count = this.length ;
      
      // prepare image array
      var img_paths = Array() ;
      var img_div = $('.tip-img');
           img_div.each(function(){
                         img_paths.push($(this).attr('src'));
                      });
                      
      var current = 0 ;
      
        return this.each(function(){
          
            var $this = $(this); // get each element 
            
            // prepare tooltip content
            var title = $this.attr('title') ;
            var img   = img_paths[current] ; // get image from other div
                 current = current + 1 ;

            // awesome tip
            
            var tip = '<div class="'+defaults.wrapperClass+'">' +
                            '<div class="awsm-img"><img src="'+img+'" width="120" height="60" alt="awsm-img"></img></div>' +
                            '<div class="awsm-desc">'+title+'</div>' +
                       '</div>' ;
            $this.append(tip) ;
            
            // prepare position
            var $tooltip = $('.'+defaults.wrapperClass,this);
                  var t_width = $tooltip.width() ;
                  // get dimension of element
                  var e_width = $this.width();
                  var e_height = $this.height();
                  
                  // build css propert for each tip
                  var marginTop = e_height - defaults.distance ;
                  var marginLeft = ( t_width - e_width ) / 2 ;
                       marginLeft = defaults.padLeft - marginLeft ;
                       
                  // apply css , set margin for tips
                  $tooltip.css({ marginLeft : marginLeft + 'px' , bottom : marginTop + 'px' });
                  $tooltip.css('opacity',0);
            
            // hide for first
            $this.css('position','relative');
            $this.removeAttr('title') ; // remove title
            $this.bind('mouseover',linkOver);
            $this.bind('mouseout',linkOut);
            
            
            function linkOver(){
                $tooltip.show().css({
                    bottom: marginTop +'px'
                }).animate({
                    bottom: defaults.distance + marginTop ,
                 opacity: 1
                }, defaults.speed);
              }
              
              function linkOut(){
                
                $tooltip.hide();
                
                /*
                 animate({
                    bottom: ( defaults.distance * 1.5 ) + marginTop,
                    opacity: 0
                }, defaults.speed )
                 
                 */
            }
            
            
        });
    };
}) ( jQuery ) ;
