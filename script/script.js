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
    let logoListIndex = 1;
    const $logoWhitePage = $("#logoWhitePage");
    const $logoTextBoxList = $(".logoDetail");
    const $logoTitleSpan = $(".logoDetail > h2 > span");
    const $logoTextSpan = $(".logoTextRight > p > span");
    const $logoIndexSpan = $(".logoTextLeft > span:nth-of-type(1)");
    const logoSpanArray = [$logoTitleSpan, $logoTextSpan, $logoIndexSpan];
    let logopageControl = 0;
    const $logoImg = $(".logoImg");
    const $logoImgOn = $(".logoImg.on");
    const $styleTitleH2 = $("#styleTitle > h2");
    const $sensualDesignTypo = $("#sensualDesignTypo > h3");
    const $sensualDesign = $("#sensualDesign");
    const $modelBackground= $("#sensualDesign div:first-of-type > img:nth-of-type(1)")
    const $flexBox = $("#flexBox");
    const $wideStyleContent = $("#lookBookPage > div:first-Child");
    const $seasonsLookBook = $("#seasonsLookBook");
    const $LookBookLeftButton = $seasonsLookBook.children("button:nth-of-type(1)");
    const $LookBookRightButton = $seasonsLookBook.children("button:nth-of-type(2)");
    const $LookBookImgList = $seasonsLookBook.children("ul");
    let $LookBookOnImg  = $LookBookImgList.children("li.on");
    let $LookBookOnStrong = $LookBookOnImg.children("a").children("strong");
    const $collaboPage = $("#collaboPage");
    const $collaboPageMainImg = $("#collaboPage > img:nth-of-type(1)");
    let collaboImgSize = 1
    let collaboImgScale = collaboImgSize * 1.2;

    //빈 요소<div>를 스크립트를 활용해 생성
    blackoverlay();
    const $blackoverlay = $("#blackoverlay");


    window.addEventListener("wheel", function (event) {
        event.preventDefault();
        console.log(pageIndex);

        if(event.deltaY > 0) {
            scrollDown();
        }else if(event.deltaY < 0){
            scrollUp();
        }
    }, {passive: false});

    // 슬로건 페이지의 버튼
    $sloganButton.on("click", function() {
        pageIndex = 2;
        secondPageUp();
    });
   
    // 룩북 페이지 버튼
    $LookBookLeftButton.on("click", function() {
        resetVaviable(); 
        movingLeftFunc();
    });

    $LookBookRightButton.on("click", function() {
        resetVaviable(); 
        movingRight();
    });

    function blackoverlay() {
        $("<div id='blackoverlay'></div>").appendTo($collaboPage);
    }

    function scrollDown(){
        //이미지가 최대크기고 페이지 인덱스가 0일때 페이지 인덱스를 1로 올린다. 
        if(pageIndex == 0 || pageIndex == 1){
            //타이틀 페이지 확대
            titlePageUpscaleFunc();
            if(pageIndex == 0 && imgScale >= 10){
                pageIndex = 1;
            }else if(pageIndex == 1 && !$sloganSource.is(":visible")) {
                //슬로건 보여주기
                showSlogan();
            }else if($sloganSource.is(":visible") && pageIndex == 1){
                pageIndex = 2;
            }
        }else if(pageIndex == 2 && !parseInt($logoTitle.css("opacity"))) {
            //다음 페이지 올라오기
            secondPageUp();      
        }else if(pageIndex == 2 && parseInt($logoTitle.css("opacity"))){
            logoTitleScrollUp();
        }else if(pageIndex == 3 && parseInt($logoWhitePage.css("left"))){
            // logoListIndex = 1;
            //페이지 인덱스가 3이되면 로고 페이지가 들어온다. 
            logoPageIn();
        }else if(pageIndex == 3 && !parseInt($logoWhitePage.css("left"))){
            //스크롤 이벤트 조절
            if(logopageControl == 0){
                logopageControl = 1
                changeLogoFunc();
                changeImgFunc();
                changeBackgroundFunc();

                if(pageIndex == 3 && logoListIndex == 3){
                    //마지막 페이지에서는 페이지의 인덱스를 높인다. 
                    logoPageEnd();
                    styleTitleUp();

                    pageIndex = 4; 
                }
                window.setTimeout(()=>{logopageControl = 0},500);
            }
        }else if(pageIndex == 4 && $styleTitleH2.attr("style")){
            styleTitleDown();
            shrinkText();
            
            pageIndex = 5;
        }else if(pageIndex == 5 && $modelBackground.attr("style")){
            $flexBox.css({marginLeft: "-100%"});

            $wideStyleContent.children("img:first-child").css({left: "13%"});
            $wideStyleContent.children("img:nth-child(2)").css({left: "20%"});
            $wideStyleContent.children("div").css({right: "15%"});

            window.setTimeout(()=>{pageIndex = 6},400);
        }else if(pageIndex == 6 ){
            $flexBox.css({marginTop: "-100vh"})
            $wideStyleContent.children("img:nth-child(2)").css({top: "10%"});
            $wideStyleContent.children("div").css({top: "35%"});

            window.setTimeout(()=>{pageIndex = 7},400);
        }else if(pageIndex == 7){
            $flexBox.css({marginTop: "-200vh"});
            window.setTimeout(()=>{ pageIndex = 8 },400);
        }else if(pageIndex == 8 && collaboImgSize >= 1){
            if(collaboImgSize <= 10){
                $blackoverlay.css({opacity: "0"});
                this.window.setTimeout(() => {
                    $blackoverlay.css({display: "none"});
                }, 400);
            }
            if(collaboImgSize >= 150){
                $collaboPageMainImg.css({opacity: 0});
                this.window.setTimeout(() => {
                    $collaboPageMainImg.css({display: "none"});
                }, 200);
                return;
            } 
    
            $collaboPageMainImg.css({transform: `translate(-50%, -50%) scale(${collaboImgSize})`});
            collaboImgScale = ++collaboImgSize * 1.2;
        }
    }

    function scrollUp(){
        if(pageIndex <= 0){
            //인덱스 페이지가 0일때 타이틀 페이지 축소
            titlePageDownscaleFunc();
        }else if(pageIndex == 1){
            //슬로건 숨기기, 콜백함수로 애니메이션 끝나면 페이지 인덱스 0으로 감소
            hideSlogan();
        }else if(pageIndex == 2 && scrollIndex >= 2) {
            //다음 페이지 올라오기
            logoTitleScrollDown();
        }else if(pageIndex == 2 && scrollIndex <= 1){
            secondPageDown();
        }else if(pageIndex == 3 && logoListIndex == 1){
            //페이지를 숨기고 페이지 인덱스를 2로 내린다. 
            logoPageOut();
        }else if(pageIndex == 3 && (logoListIndex == 2 || logoListIndex == 3)){
            //스크롤 이벤트 횟수 컨트롤
            if(logopageControl == 0){
                logopageControl = 1
                
                prevLogoFunc();
                prevChangeImgFunc();
                prevChangeBackgroundFunc();

                window.setTimeout(()=>{logopageControl = 0},500);
            }
        }else if(pageIndex == 4 && parseInt($logoWhitePage.css("left"))){
            $styleTitleH2.removeAttr("style");
            
            $logoWhitePage.css({left: `0%`});

            //인덱스가 바로 3에서 2로 넘어가 버리는 문제 > 살짝 늦게 인덱스를 내린다. 
            this.window.setTimeout(() => {pageIndex = 3}, 400)
        }else if(pageIndex == 5 && logopageControl == 0){
            logopageControl = 1

            prevTextShrink();

            this.window.setTimeout(() => {pageIndex = 4; logopageControl = 0}, 2000);
        }else if(pageIndex == 6){
            logopageControl = 1
            
            $flexBox.removeAttr("style");
            $wideStyleContent.children().removeAttr("style");
            pageIndex = 5;

            this.window.setTimeout(() => {logopageControl = 0}, 500);
        }else if(pageIndex == 7) {
            $flexBox.css({marginTop: "0vh"})
            $wideStyleContent.children("img:nth-child(2)").css({top: ""});
            $wideStyleContent.children("div").css({top: ""});

            this.window.setTimeout(() => {pageIndex = 6}, 400);
        }else if(pageIndex == 8){
            if(collaboImgSize <= 1){
                collaboImgSize = 1;
                $collaboPageMainImg.css({display: "block", opacity: 1});
                return;
            }
            collaboImgSize = --collaboImgSize
            $collaboPageMainImg.css({transform: `translate(-50%, -50%) scale(${collaboImgSize})`});
        }
    }

    function movingRight() {
        $LookBookOnImg.next().addClass("on").children("a").children("strong").fadeIn();
        $LookBookOnImg.removeClass("on");
        
        // ul을 30% 옮겨서 다음 요소를 가운데로 위치 시킨다. 
        $LookBookImgList.css({transitionDuration: "400ms",left: "-33%"});

        window.setTimeout(() => {
            $LookBookImgList.children("li:first-child").appendTo($LookBookImgList);
            $LookBookImgList.removeAttr("style");
        }, 400);
    }

    function movingLeftFunc() {
        //클래스를 다시 붙인다. 
        $LookBookOnImg.prev().addClass("on").children("a").children("strong").fadeIn();
        $LookBookOnImg.removeClass("on");

        $LookBookImgList.children("li:last-child").prependTo($LookBookImgList);
        $LookBookImgList.css({transitionDuration: "",left: "-33%"});

        window.setTimeout(() => {$LookBookImgList.css({transitionDuration: "400ms",left: ""})}, 10)

        //기존의 클래스는 제거한다. 
        $LookBookOnImg.children("a").children("strong").fadeOut();
    }

    function resetVaviable() {
        //필요한 on 변수를 다시 대입 시킨다. 
        $LookBookOnImg = $LookBookImgList.children("li.on");
        $LookBookOnStrong = $LookBookOnImg.children("a").children("strong");
    }

    function prevTextShrink() {
        $sensualDesignTypo.removeAttr("style");
    

        this.window.setTimeout(() => {
            $secondPage.css({backgroundColor: ""});
            this.window.setTimeout(() => {$sensualDesign.css({display: "none"})}, 400);
            $modelBackground.removeAttr("style");
            styleTitleUp();
        }, 1200);
    }

    function shrinkText() {
        // none이었던 요소를 다시 플렉스로 되돌린다. 
        this.window.setTimeout(() => {$sensualDesign.css({display:"flex"})},400)

        this.window.setTimeout(() => {
            $sensualDesignTypo.css({transform: "scale(1)"})
            $secondPage.css({backgroundColor: "#f1f1f1"})
            this.window.setTimeout(()=>{
                $modelBackground.css({width: "210px"})
            }, 1200)
        }, 500);
    }

    function styleTitleDown() {
        $styleTitleH2.removeAttr("style");
        // this.window.setTimeout(()=>{pageIndex = 6;}, 400)
    }

    function styleTitleUp() {
        //타이틀이 솟아오른다.
        this.window.setTimeout(() => {
            $styleTitleH2.css({top: 0});
        }, 400);
    }

    function prevChangeBackgroundFunc() {
        $logoWhitePage.css({backgroundImage: `url("img/logoBackgroundNumber${logoListIndex - 1}.png")`})
    }

    function changeBackgroundFunc() {
        if(logoListIndex >= 3) return;
        $logoWhitePage.css({backgroundImage: `url("img/logoBackgroundNumber${logoListIndex + 1}.png")`})
    }

    function prevChangeImgFunc() {
        logoImgHide();

        window.setTimeout(() => {logoImgOnChange();}, 400) 
    }
    
    function changeImgFunc() {
        if(logoListIndex >= 3) return;
        logoImgHide();

        window.setTimeout(() => {logoImgOnChange();}, 400) 
    }

    function logoImgOnChange() {
        $logoImg.removeClass("on").filter(`:nth-of-type(${logoListIndex})`).addClass("on");
        let $logoImgOn = $(".logoImg.on");
        $logoImgOn.animate({top:"50%", opacity: 1}, 300);
    }

    function logoImgHide() {
        let $logoImgOn = $(".logoImg.on");
        $logoImgOn.animate({top: "35%", opacity: 0});
        window.setTimeout(() => {$logoImgOn.removeAttr("style");}, 400) ;
    }

    function prevLogoFunc() {
        hideSpanLoop();

        window.setTimeout(() => {

            logoListIndex--;

            $logoTextBoxList.removeClass("on").filter(`:nth-of-type(${logoListIndex})`).addClass("on");

            window.setTimeout(() => {showSpanLoop();}, 100) 
        }, 400);  
    }
   
    function changeLogoFunc() {
        if(logoListIndex >= 3) return;
        hideSpanLoop();
        
        window.setTimeout( () => { 

            logoListIndex++;
           
            $logoTextBoxList.removeClass("on").filter(`:nth-of-type(${logoListIndex})`).addClass("on");
    
            window.setTimeout(() => {showSpanLoop();}, 100) 
        }, 400);
    }

    function logoPageIn() {
        logoReturnFirstPage();
        $logoWhitePage.css({left: `0%`});
        window.setTimeout(() => {
            showSpanLoop();
        }, 500);
        $logoImg.eq(0).addClass("on");
        $logoImgOn.delay(500).animate({top: "50%", opacity: "1"});
        window.setTimeout(() => {$logoImg.eq(0).clearQueue();}, 600)
    }

    function logoReturnFirstPage(){
        logoListIndex = 1;
        $logoTextBoxList.removeClass("on").filter(`:nth-of-type(${logoListIndex})`).addClass("on");
    }

    function hideSpanLoop() {
        for(let i = 0; i < logoSpanArray.length; i++){
            logoSpanArray[i].removeAttr("style");
        }
    }

    function showSpanLoop() {
        for(let i = 0; i < logoSpanArray.length; i++){
            logoSpanArray[i].css({top: `0%`});
        }
    }

    function logoPageEnd() {
        $logoWhitePage.removeAttr("style");
    }

    function logoPageOut() {
        $logoWhitePage.removeAttr("style");
        $logoTitleSpan.removeAttr("style");
        $logoTextSpan.removeAttr("style");
        $logoIndexSpan.removeAttr("style");
        window.setTimeout(() => 
        {$logoImg.removeAttr("style").removeClass("on");}, 600)
        
        pageIndex = 2;
    }
    
    function logoTitleScrollUp() {
        if(scrollIndex >= 15){
            pageIndex = 3;
            return;
        }
        
        ++scrollIndex ;

        scrollSpeedLoop()    
    }

    function logoTitleScrollDown() {
        if(scrollIndex <= 0)return;

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