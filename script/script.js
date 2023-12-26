$(function () {
    let imgSize = 10;
    let pageIndex = 0;
    //타이틀 글씨
    const $titleImg = $("#main > img:nth-of-type(1)");
    //타이틀 티셔츠
    const $Tshirts = $("#main > img:nth-of-type(2)");
    const $overlaySlogan = $("#overlaySlogan");
    const $sloganSource = $(".sloganSource");
    
    window.addEventListener("wheel", function (event) {
        event.preventDefault;

        //페이지 인덱스 컨트롤
        if(imgSize == 50 && pageIndex == 0)pageIndex++;
        if(imgSize == 49 && pageIndex == 1)pageIndex--;
        // console.log(pageIndex);

        if(event.deltaY > 0) {
            //타이틀 페이지 확대
            titlePageUpscaleFunc();
            //슬로건 보여주기
            showSlogan();
            
            

            
        }else{
            //타이틀 페이지 축소
            titlePageDownscaleFunc();
            //슬로건 숨기기
            hideSlogan();
              

        }
    });






    function showSlogan() {
        if(pageIndex == 1) {
            $overlaySlogan.fadeIn(function(){$sloganSource.fadeIn()});
        }
    }

    function hideSlogan() {
       if(pageIndex == 0) {
            $sloganSource.fadeOut(function(){$overlaySlogan.fadeOut()});
        }
    }
    
    function titlePageUpscaleFunc() {
        let imgScale = imgSize / 100 * 10;

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

        $titleImg.css({
            transform: `translate(-50%, -50%) scale(${imgScale.toFixed(2)})`
        });
    }

    function titlePageDownscaleFunc() {
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

/* 
                퍼센트 * 100 * 전체 = 크기
                10 / 100 * 10 = 1
                11 / 100 * 10 = 1.1
                ...
                100 / 100 * 10 = 10
            */
}); //document.onready