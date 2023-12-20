$(function () {
    let imgSize = 10;
    const $titleImg = $("#main > img:nth-of-type(1)");
    const $Tshirts = $("#main > img:nth-of-type(2)");
    // console.log($titleImg); 
    
    window.addEventListener("wheel", function (event) {
        event.preventDefault;
        

        if(event.deltaY > 0) {
            // 끝까지 갔으면 투명해지면서 더이상 안커진다. 
            if(imgSize >= 50){
                $titleImg.css({
                    opacity: 0
                 });
                return;
            }
            // 티셔츠가 사라진다.
            if(imgSize >= 10){
                $Tshirts.css({
                    opacity: 0 
                 });
            }
            
            imgSize++;
            let imgScale = imgSize / 100 * 10;

            $titleImg.css({
                transform: `translate(-50%, -50%) scale(${imgScale.toFixed(2)})`
            });

            /* 
                퍼센트 * 100 * 전체 = 크기
                10 / 100 * 10 = 1
                11 / 100 * 10 = 1.1
                ...
                100 / 100 * 10 = 10
            */
        }else{
            console.log(imgSize);
            if(imgSize <= 10){
                $Tshirts.css({
                   opacity: 1 
                })
                return;
            }
            if(imgSize <= 49){
                $titleImg.css({
                    opacity: 1 
                 });
            }

            imgSize--;
            let imgScale = imgSize / 100 * 10;

            $titleImg.css({
                transform: `translate(-50%, -50%) scale(${imgScale.toFixed(2)})`
            });

        }
    });












}); //document.onready