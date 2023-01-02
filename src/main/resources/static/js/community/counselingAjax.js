/*
*
*
* */
globalThis.page = 0;
$(document).ready(function () {
    globalThis.check = false;
    show();

    // 작성
    function add(counseling, callback) {
        $.ajax({
            url: "/counseling/counselingOk",
            type: "post",
            data: JSON.stringify(counseling),
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (callback) {
                    callback(result);
                }
            },
            error: function (xhr, status, err) {
                console.log(xhr, status, err);
            }
        });
    }

    // 목록
    function show() {
        // alert(globalThis.page);

        $.ajax({
            url: "/counseling/counselingList?page=" + (globalThis.page),
            type: "get",
            success: function (counselingDTOS) {
                if (counselingDTOS != null) {
                    getList(counselingDTOS);
                }
            },
            error: function (xhr, status, err) {
                console.log(xhr, status, err);
            }
        });
    };


    // 작성 send 클릭
    $("#sendButton").on("click", function () {
        var $title = $("#counselingTitle");
        var $content = $("#summernote");

        if ($title.val() == "") {
            alert("제목을 입력해주세요");
            return;
        }

        if ($content.val() == "") {
            alert("내용을 입력해주세요");
            return;
        }

        add({
            counselingTitle: $title.val(),
            counselingContent: $content.val(),
            userId: $("#user").val()
        }, function () {
            showUpdate();
        });

        $(".editorMdoal").attr("style", "display:none !important;")
        $(".editorMdoal").find(".editorTitle input").val("");
        $(".editorMdoal").find(".note-editable").text("");
        $(".updatePost_1j").css("display", "none");

    });

    //dom 화면
    function getList(counselingDTOS) {
        // alert(communityDTOS);
        console.log(counselingDTOS);
        let id = '';
        let text= '';
        $(counselingDTOS.content).each((i, item) => {
            id= item.counselingId;
            text += `<div class='loungeCard' style='margin-bottom: -10px;' id="`+id+`">`;
            text += "<div class='loungeCardContents'>";
            text += "<div class='loungeCardContentsComponents_loungeContents__262-A'>";
            text += "<div class='loungeCardContentsComponents_loungeContentsTagMoreBox__1oKkG'>";
            text += "<div class='undefined'>";
            text += "<div class='tag_tag__2gh0s tag_typeDefault__3U6Rz tag_sizeDefault__2V2-5'>";
            text += "<span>네오스인 고민</span>";
            text += "</div>";
            text += "</div>";

            if ($("#userId").attr("value") == item.user.userId) {
                text += "<div class='loungeCardContentsComponents_loungeContentsRight__14cdz'>";
                text += "<div class='loungeCardContentsComponents_loungeContentsMore__2AXVI'>";
                text += "<button type='button' class='buttonComponents_button__1hvQa buttonComponents_plain__1ljW5'>";
                text += "<img class='buttonComponents_mdImg__G1pNE' src='https://letspl.me/assets/images/ic-more.svg'>";
                text += "</button>";
                text += "<div class='loungeCardContentsComponents_loungeContentsMoreButtonBox__2jERo'>";
                text += "<button type='button' class='buttonComponents_button__1hvQa buttonComponents_plain__1ljW5 postUpdate_1j'>수정</button>";
                text += "<button type='button' class='buttonComponents_button__1hvQa buttonComponents_plain__1ljW5 postDelete_1j'>삭제</button>";
                text += "</div></div></div>";
            }
            text += "</div>";
            text += "<div class='loungeCardContentsComponents_loungeContentsTitleBox__2NtjH'>";
            text += "<div class='loungeCardContentsComponents_loungeContentsTitleDate__1-Xd2'>";
            text += "<h3 class='counTitle loungeCardContentsComponents_title__1s8RE'>" + item.counselingTitle + "</h3>";
            text += "<span class='loungeCardContentsComponents_date__3pY5X'>"+ counselingService.timeForToday(item.updatedDate) +"</span>";
            text += "</div>";
            text += "</div>";
            text += "<div class='counContent loungeCardContentsComponents_loungeContentsAreaDefault__3QCG4'>" + item.counselingContent + "</div>";
            text += "<div class='loungeCardContentsComponents_loungeContentsMoreButtonWrap__1LR4v'>";
            text += "<button type='button' class='buttonComponents_button__1hvQa buttonComponents_plain__1ljW5 buttonComponents_blue__1FlTU'>펼치기</button>";
            text += "</div>";
            text += "<div class='replyComponent_reply__3l-Wc'>";
            text += "<div class='replyComponent_replyButtonBox__2O3ME'>";
            text += "<div class='replyComponent_replyOnOff__QKoso'>";
            text += "<button type='button' class='replyList buttonComponents_button__1hvQa buttonComponents_plain__1ljW5'>";
            text += "<span class='buttonComponents_gray__1blI9'>댓글을 달아주세요</span>";
            text += "<img class='buttonComponents_smMdImg__2IOAr' src='https://letspl.me/assets/images/ic-arrow-up.svg'>";
            text += "</button>";
            text += "</div>";
            text += "</div>";

            //댓글
            text += "<form  name='communityReplyWrite' class='replyForm' method='post' class='form-horizontal form-validate' role='form' target='hidden_frame' enctype='multipart/form-data' autocomplete='off'novalidate='novalidate'>";
            text += "<div class='replyComponent_replyInputBox__2yLKK'>";
            text += "<div class='replyComponent_replyInputContainer__3TJW8'>";

            if ($("#userId").attr("value") != null) {
                text += "<textarea class='replyContent replyComponent_replyInput__2vKhX' maxlength='1000' placeholder='댓글을 입력해주세요.' style='height: 21px !important;'></textarea>";
            } else {
                text += "<textarea  readonly class='replyContent replyComponent_replyInput__2vKhX' maxlength='1000' placeholder='댓글을 입력해주세요.' style='height: 21px !important;'></textarea>";
            }
            text += "</div>";
            text += "<div class='replyComponent_replyButtonGroup__2i0ow'>";
            text += "<div class='replyComponent_replyButtonGroupCount__j0XkV'>";
            text += "<span class='rereplyTextCount'>0</span><span>/</span><span>1000</span>";
            text += "</div>";
            text += "<input type='hidden'  name='userId' id='replyUser' class='user'>";
            text += "<input type='hidden' name='counselingId' class='replyCounseling'value='" + item.counselingId + "'>";

            if ($("#userId").attr("value") != null) {
                text += "<button type='button' class='replyWrite buttonComponents_button__1hvQa buttonComponents_square__3hf2r'>확인</button>";
            } else {
                text += "<button type='button' class=' buttonComponents_button__1hvQa buttonComponents_square__3hf2r' style='cursor: auto;'>로그인 후 이용 가능합니다</button>";
            }
            text += "</div>";
            text += "</div>";
            text += "</form>";

            text += "<div class='replyComponent_replyBox__1duHS'>";
            text += "</div>";

            text += "</div></div></div>";
            text += "<input class='cid' type='hidden' value='" + item.counselingId + "'>";
            text += "<input type='hidden' value='" + item.user.userId + "'>";
            text += "</div>";


        });
        $("div.centerSectionBox").append(text);
        if(counselingDTOS.last){
            $(".moreButton").hide();
        }
    }

    //더보기 버튼 클릭
    $(".moreButton").on("click", function(e){
        // alert("클릭");
        e.preventDefault();
        if(!globalThis.check){
            globalThis.page = globalThis.page+1;
            // alert("더보기");
            show();
        }
    });


    /*-----------------------------------------------------------------------------------------------------------*/
    //수정 버튼 클릭(모달 띄우기)
    $("div.centerSectionBox").on("click", ".postUpdate_1j", function () {
        const $titles = $(".counTitle");
        const $contents = $(".counContent");

        let i = $(this).closest(".loungeCard").index();
        let up = $(this).closest(".loungeCard").children(".cid").val();

        $("#cidUpdate").val(up);

        var $title = $titles.eq(i).text();
        var $content = $contents.eq(i).text();

        $(".editorMdoal").find(".editorTitle input").val($title);
        $(".editorMdoal").find(".note-editable").text($content);

        $(".editorMdoal").attr("style","display:flex !important;");
        $(".updatePost_1j").css("display","block");
        $(".registerPost_1j").css("display","none");

    })


    //수정 ajax
    $(".updatePost_1j").on("click", function () {
        $.ajax({
            url: "/counseling/counselingUpdate",
            type: "put",
            data: JSON.stringify({
                counselingTitle: $("#counselingTitle").val(),
                counselingContent: $("#summernote").val(),
                counselingId : $("#cidUpdate").val()
            }),
            contentType: "application/json; charset=utf-8",
            success: function(){
                showUpdate();
            },
            error: function (xhr, status, err) {
                console.log(xhr, status, err);
            }
        });

        $(".updatePost_1j").css("display","none");
        $(".editorMdoal").attr("style","display:none !important;")
        $(".editorMdoal").find(".editorTitle input").val("");
        $(".editorMdoal").find(".note-editable").val("");
    })

    // 수정 후 목록 ajax
    function showUpdate() {
        globalThis.page = 0
        $.ajax({
            url: "/counseling/counselingList?page= "+ (globalThis.page) +"&size" + (globalThis.page) * 5,
            type: "get",
            success: function (counselingDTOS) {
                if(counselingDTOS != null){
                    getListUpdate(counselingDTOS);
                }
            },
            error: function (xhr, status, err) {
                console.log(xhr, status, err);
            }
        });
    };

    // 수정 후 dom
    function getListUpdate(counselingDTOS) {
        // alert(communityDTOS);
        console.log(counselingDTOS);
        let id = '';
        let text= '';
        $(counselingDTOS.content).each((i, item) => {
            id= item.counselingId;
            text += `<div class='loungeCard' style='margin-bottom: -10px;' id="`+id+`">`;
            text += "<div class='loungeCardContents'>";
            text += "<div class='loungeCardContentsComponents_loungeContents__262-A'>";
            text += "<div class='loungeCardContentsComponents_loungeContentsTagMoreBox__1oKkG'>";
            text += "<div class='undefined'>";
            text += "<div class='tag_tag__2gh0s tag_typeDefault__3U6Rz tag_sizeDefault__2V2-5'>";
            text += "<span>네오스인 고민</span>";
            text += "</div>";
            text += "</div>";

            if ($("#userId").attr("value") == item.user.userId) {
                text += "<div class='loungeCardContentsComponents_loungeContentsRight__14cdz'>";
                text += "<div class='loungeCardContentsComponents_loungeContentsMore__2AXVI'>";
                text += "<button type='button' class='buttonComponents_button__1hvQa buttonComponents_plain__1ljW5'>";
                text += "<img class='buttonComponents_mdImg__G1pNE' src='https://letspl.me/assets/images/ic-more.svg'>";
                text += "</button>";
                text += "<div class='loungeCardContentsComponents_loungeContentsMoreButtonBox__2jERo'>";
                text += "<button type='button' class='buttonComponents_button__1hvQa buttonComponents_plain__1ljW5 postUpdate_1j'>수정</button>";
                text += "<button type='button' class='buttonComponents_button__1hvQa buttonComponents_plain__1ljW5 postDelete_1j'>삭제</button>";
                text += "</div></div></div>";
            }
            text += "</div>";
            text += "<div class='loungeCardContentsComponents_loungeContentsTitleBox__2NtjH'>";
            text += "<div class='loungeCardContentsComponents_loungeContentsTitleDate__1-Xd2'>";
            text += "<h3 class='counTitle loungeCardContentsComponents_title__1s8RE'>" + item.counselingTitle + "</h3>";
            text += "<span class='loungeCardContentsComponents_date__3pY5X'>"+ counselingService.timeForToday(item.updatedDate) +"</span>";
            text += "</div>";
            text += "</div>";
            text += "<div class='counContent loungeCardContentsComponents_loungeContentsAreaDefault__3QCG4'>" + item.counselingContent + "</div>";
            text += "<div class='loungeCardContentsComponents_loungeContentsMoreButtonWrap__1LR4v'>";
            text += "<button type='button' class='buttonComponents_button__1hvQa buttonComponents_plain__1ljW5 buttonComponents_blue__1FlTU'>펼치기</button>";
            text += "</div>";
            text += "<div class='replyComponent_reply__3l-Wc'>";
            text += "<div class='replyComponent_replyButtonBox__2O3ME'>";
            text += "<div class='replyComponent_replyOnOff__QKoso'>";
            text += "<button type='button' class='replyList buttonComponents_button__1hvQa buttonComponents_plain__1ljW5'>";
            text += "<span class='buttonComponents_gray__1blI9'>댓글을 달아주세요</span>";
            text += "<img class='buttonComponents_smMdImg__2IOAr' src='https://letspl.me/assets/images/ic-arrow-up.svg'>";
            text += "</button>";
            text += "</div>";
            text += "</div>";

            //댓글
            text += "<form  name='communityReplyWrite' class='replyForm' method='post' class='form-horizontal form-validate' role='form' target='hidden_frame' enctype='multipart/form-data' autocomplete='off'novalidate='novalidate'>";
            text += "<div class='replyComponent_replyInputBox__2yLKK'>";
            text += "<div class='replyComponent_replyInputContainer__3TJW8'>";

            if ($("#userId").attr("value") != null) {
                text += "<textarea  class='replyContent replyComponent_replyInput__2vKhX' maxlength='1000' placeholder='댓글을 입력해주세요.' style='height: 21px !important;'></textarea>";
            } else {
                text += "<textarea  readonly class='replyContent replyComponent_replyInput__2vKhX' maxlength='1000' placeholder='댓글을 입력해주세요.' style='height: 21px !important;'></textarea>";
            }
            text += "</div>";
            text += "<div class='replyComponent_replyButtonGroup__2i0ow'>";
            text += "<div class='replyComponent_replyButtonGroupCount__j0XkV'>";
            text += "<span class='rereplyTextCount'>0</span><span>/</span><span>1000</span>";
            text += "</div>";
            text += "<input type='hidden'  name='userId' id='replyUser' class='user'>";
            text += "<input type='hidden' name='counselingId' class='replyCounseling'value='" + item.counselingId + "'>";

            if ($("#userId").attr("value") != null) {
                text += "<button type='button' class='replyWrite buttonComponents_button__1hvQa buttonComponents_square__3hf2r'>확인</button>";
            } else {
                text += "<button type='button' class=' buttonComponents_button__1hvQa buttonComponents_square__3hf2r' style='cursor: auto;'>로그인 후 이용 가능합니다</button>";
            }
            text += "</div>";
            text += "</div>";
            text += "</form>";

            text += "<div class='replyComponent_replyBox__1duHS'>";
            text += "</div>";

            text += "</div></div></div>";
            text += "<input class='cid' type='hidden' value='" + item.counselingId + "'>";
            text += "<input type='hidden' value='" + item.user.userId + "'>";
            text += "</div>";


        });
        $("div.centerSectionBox").html(text);
        if(counselingDTOS.last){
            $(".moreButton").hide();
        }
    }

    /*-----------------------------------------------------------------------------------------------------------*/
    //삭제 모달 띄우기
    $("div.centerSectionBox").on("click", ".postDelete_1j", function () {
        let cid = $(this).closest(".loungeCard").children(".cid").val();
        $(".cidDelete").val(cid);

        $(".deleteModal").attr("style","display : block !important")
        $(".modalTit").text("글 삭제 확인");
        $(".commonModalContent p").text("해당 글을 삭제하시겠습니까?");
    })
    //삭제 모달 지우기
    $(".modalWrapOpen").find(".closeBtn").on("click",function () {
        $(".modalWrapOpen").attr("style","display : none !important")
    })
    //삭제 모달 지우기
    $(".modalWrapOpen").find(".doubleBtnWrap").click(function () {
        $(".modalWrapOpen").attr("style","display : none !important")
    })

    // 삭제 ajax
    $(".modalWrapOpen").on("click", ".deleteBtn", function () {
        $.ajax({
            url: "/counseling/counselingDelete",
            type: "delete",
            data: JSON.stringify({counselingId : $(".cidDelete").val()}),
            contentType: "application/json; charset=utf-8",
            success: function(){
                showUpdate();
            },
            error: function (xhr, status, err) {
                console.log(xhr, status, err);
            }
        });
        $(".modalWrapOpen").attr("style","display : none !important")
    })

})

/*-----------------------------------------------------------------------------------------------------------*/
// 서비스에 대한 기능들을 하나의 모듈로 묶어서 처리한다.
let counselingService = (function() {
    function timeForToday(value) {
        const today = new Date();
        const timeValue = new Date(value);

        const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
        if (betweenTime < 1) return '방금전';
        if (betweenTime < 60) {
            return `${betweenTime}분전`;
        }

        const betweenTimeHour = Math.floor(betweenTime / 60);
        if (betweenTimeHour < 24) {
            return `${betweenTimeHour}시간전`;
        }

        const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
        if (betweenTimeDay < 365) {
            return `${betweenTimeDay}일전`;
        }

        return `${Math.floor(betweenTimeDay / 365)}년전`;
    }

    return {timeForToday:timeForToday}
})();

