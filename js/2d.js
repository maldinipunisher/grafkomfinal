var height = 600, width = 600,
                canv, ctx, interval, 
                h = height, a = 0.1, v = 0, ballAbsorption = 0.8,
                ballSize = 60, ballRadius = ballSize / 2, frameRate = 20;

            function drawBall() {
                if(h <= 0 && v > 0) {
                    v *= -1 * ballAbsorption; 
                    
                    if(v > -0.1 && v < 0.1) {
                        clearInterval(interval);
                        interval = null;
                    }
                }
                
                
                v += a; 
                h -= v; 
                
                ctx.clearRect(0, 0, height, width);
                ctx.fillStyle = "red";
                ctx.beginPath();
                ctx.arc(width/2, height - h - ballRadius, ballRadius, 0, Math.PI*2,true);
                ctx.fill();
            }

             window.onload = function() {
                canv = document.getElementById('more');
                canv.height = height;
                canv.width = width;
                ctx = canv.getContext("2d");
                interval = setInterval(drawBall, frameRate);
                canv.addEventListener('click', function(){
                    h = height;
                    v = 0;
                    if(!interval) {
                        interval = setInterval(drawBall, frameRate);
                    }
                });
            }