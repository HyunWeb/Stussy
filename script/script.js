$(function () {
    let imgSize = 10;
    let pageIndex = 0;
    //타이틀 글씨
    const $titleImg = $("#main > img:nth-of-type(1)");
    //타이틀 티셔츠
    const $Tshirts = $("#main > img:nth-of-type(2)");
    const $overlaySlogan = $("#overlaySlogan");
    const $sloganSource = $(".sloganSource");
    const $secondPage = $("#secondPage");
    const $sloganButton = $("#overlaySlogan > button");
    const $logoTitle = $(".logoTitle");
    

    window.addEventListener("wheel", function (event) {
        event.preventDefault;
        
        console.log(pageIndex);
      
        

        if(event.deltaY > 0) {
            //이미지가 최대크기고 페이지 인덱스가 0일때 페이지 인덱스를 1로 올린다. 
            if(imgSize >= 50 && pageIndex == 0)pageIndex = 1;
            if($sloganSource.is(":visible") && pageIndex == 1)pageIndex = 2;
            
            if(pageIndex == 0 || pageIndex == 1){
                //타이틀 페이지 확대
                titlePageUpscaleFunc();
            }

            if(pageIndex == 1) {
                //슬로건 보여주기
                showSlogan();
            }

            if(pageIndex == 2) {
                //다음 페이지 올라오기
                secondPageUp();
            }
            
            

            
        }else{

            if(pageIndex <= 0){
                //인덱스 페이지가 0일때 타이틀 페이지 축소
                titlePageDownscaleFunc();
            }
            
            //인덱스 페이지가 1일때 스크롤을 올리면 슬로건이 숨겨지며 인덱스 페이지가 0
            if(pageIndex == 1){
                //슬로건 숨기기, 콜백함수로 애니메이션 끝나면 페이지 인덱스 0으로 감소
                hideSlogan();
            }

            if(pageIndex == 2){
                secondPageDown();
            }
        }
    });

    $sloganButton.on("click", function() {
        pageIndex = 2;
        secondPageUp();
    });




    function secondPageUp() {
            $secondPage.css({top: "0%"});
            window.setTimeout(() => {
                $logoTitle.eq(0).css({top: "25%"});
                $logoTitle.eq(1).css({top: "50%"});
                $logoTitle.eq(2).css({top: "58%"});
            }, 250)
           
    }

    function secondPageDown() {
        if($secondPage.is(":animated"))return;
        $secondPage.removeAttr("style");
        window.setTimeout(() => {pageIndex = 1}, 500);
        $logoTitle.removeAttr("style");
        
    }

    function showSlogan() {
        $overlaySlogan.fadeIn(function(){$sloganSource.fadeIn()});
    }

    function hideSlogan() {
        if($sloganSource.is(":animated"))return;

        $sloganSource.fadeOut(
            function(){$overlaySlogan.fadeOut(
                function() {pageIndex = 0}
            )}
        );
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
        let imgScale = imgSize / 100 * 10;

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