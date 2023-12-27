$(function () {
    let imgSize = 1;
    let imgScale = imgSize * 1.2;
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
    let scrollIndex = 0;
    const $logoWhitePage = $("#logoWhitePage");
    const $logoTitleSpan = $(".logoDetail > h2 > span");
    const $logoTextSpan = $(".logoTextRight > p > span");
    const $logoIndexSpan = $(".logoTextLeft > span:nth-of-type(1)");
    

    window.addEventListener("wheel", function (event) {
        event.preventDefault;
        console.log(pageIndex);

        if(event.deltaY > 0) {
            //이미지가 최대크기고 페이지 인덱스가 0일때 페이지 인덱스를 1로 올린다. 
            if(imgScale >= 10 && pageIndex == 0)pageIndex = 1;
            if($sloganSource.is(":visible") && pageIndex == 1)pageIndex = 2;
            
            if(pageIndex == 0 || pageIndex == 1){
                //타이틀 페이지 확대
                titlePageUpscaleFunc();
            }

            if(pageIndex == 1) {
                //슬로건 보여주기
                showSlogan();
            }

            //처음에만 페이지 올라온다. 두번째 스크롤부터는 요소가 올라간다. 
            // 처음엔 투명도가 0이라 문자열 "0"반환 > 빈 문자열 아니라서 참 > parseInt로 숫자 0 거짓 > !로 참 변환
            if(pageIndex == 2 && !parseInt($logoTitle.css("opacity"))) {
                //다음 페이지 올라오기
                secondPageUp();      
            }else if(pageIndex == 2 && parseInt($logoTitle.css("opacity"))){
                logoTitleScrollUp();
            }

            if(pageIndex == 3){
                //페이지 인덱스가 3이되면 로고 페이지가 들어온다. 
                logoPageIn();
                
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

            if(pageIndex == 2 && scrollIndex >= 2) {
                //다음 페이지 올라오기
                logoTitleScrollDown();
            }else if(pageIndex == 2 && scrollIndex <= 1){
                secondPageDown();
            }

            if(pageIndex == 3){
                //페이지를 숨기고 페이지 인덱스를 2로 내린다. 
                logoPageOut();
            }

        }
    });

    // 슬로건 페이지의 버튼
    $sloganButton.on("click", function() {
        pageIndex = 2;
        secondPageUp();
    });

    function logoPageIn() {
        $logoWhitePage.css({left: `0%`});
        window.setTimeout(() => {
            $logoTitleSpan.css({top: `0%`});
            $logoTextSpan.css({top: `0%`});
            $logoIndexSpan.css({top: `0%`});
        }, 500);
        

    }

    function logoPageOut() {
        $logoWhitePage.removeAttr("style");
        $logoTitleSpan.removeAttr("style");
            $logoTextSpan.removeAttr("style");
            $logoIndexSpan.removeAttr("style");
        pageIndex = 2;
    }
    
    function logoTitleScrollUp() {
        if(scrollIndex >= 15){
            pageIndex = 3;
            return;
        }
        // console.log(scrollIndex);
        
        ++scrollIndex ;

        scrollSpeedLoop()    
    }

    function logoTitleScrollDown() {
        if(scrollIndex <= 0)return;
        console.log(scrollIndex)

        -- scrollIndex;

        scrollSpeedLoop();
    }

    function scrollSpeedLoop() {
        const percentArrty = [25, 50, 58];
        const dubblePercentArrty = [4, 6, 5];

        //현재 top수치값을 불러와서 i만큼 더해서 재설정하자 
        for(let i = 0; i < percentArrty.length; i++){
            $logoTitle.eq(i).css({top: `${(percentArrty[i] -= scrollIndex * dubblePercentArrty[i])}%` });
        }     
    }

    function secondPageUp() {
        scrollIndex = 0;
            $secondPage.css({top: "0%"});
            window.setTimeout(() => {
                $logoTitle.css({opacity: "1"});
                $logoTitle.eq(0).css({top: "25%"});
                $logoTitle.eq(1).css({top: "50%"});
                $logoTitle.eq(2).css({top: "58%"});
            }, 250);
            
            
           
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
        if(imgScale >= 10)return;
        imgScale = ++imgSize * 1.2;

        // 티셔츠가 사라진다.
        if(imgScale >= 1){
            $Tshirts.css({
                opacity: 0 
             });
        }

        // 끝까지 갔으면 투명해지면서 더이상 안커진다. 
        if(imgScale >= 10){
            $titleImg.css({
                opacity: 0
             });
            return;
        }

        $titleImg.css({
            transform: `translate(-50%, -50%) scale(${imgScale.toFixed(1)})`
        });
    }

    function titlePageDownscaleFunc() {
        if(imgScale <= 0)return;
        imgScale = --imgSize * 1.2;

        if(imgScale <= 1){
            $Tshirts.css({
               opacity: 1 
            })
            return;
        }

        if(imgScale <= 9.9){
            $titleImg.css({
                opacity: 1 
             });
        }

        

        $titleImg.css({
            transform: `translate(-50%, -50%) scale(${imgScale.toFixed(1)})`
        });             
    }
}); //document.onready