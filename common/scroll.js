// /* about 버튼 클릭 이동 */
// $('#about').click(function () {
//     $('html, body').animate({
//         scrollTop: $($.attr(this, 'href')).offset().top
//     }, 1000);
//     return false;
// });

/* 한 페이지 스크롤
https://seokd.tistory.com/21
휠이벤트를 받아오고 그에 따라 window.height만큼 스크롤을 내리는 원리 */

//휠의 기본 이벤트인 scroll 제거
window.addEventListener("wheel", function(e){
	e.preventDefault();
},{passive : false});

var $html = $("html");

//뷰포트에 표시되는 페이지의 번호
var page = 1;

//마지막 페이지의 번호 
var lastPage = $(".page").length;

//scroll animation time
var timeScrollAnimation = 400;

//문서(페이지)가 로드되면 첫 페이지 시작
$html.animate({ scrollTop: 0 }, 10);

//마우스 휠을 굴리면 발생되는 이벤트
$(window).on("wheel", function (e) {

    //생성된 스크롤 효과가 쌓이지 않도록 스크롤이 진행되는 동안 발생하는 wheel이벤트는 무시
    if ($html.is(":animated")) return;

    /* e(jQuery가 반환)
        .originalEvent(자바스크립트에서의 원래 이벤트)
        .deltaY(마우스 휠을 어느 방향으로 얼만큼을 굴렸는지
            (양수의 경우 아래쪽으로, 음수는 위쪽)*/
    if (e.originalEvent.deltaY > 0) {
        //마지막 페이지인 경우에는 이벤트 핸들러 종료
        if (page == lastPage) return;
        //스크롤 아래의 경우 +1
        page++;
    } else if (e.originalEvent.deltaY < 0) {
        if (page == 1) return;
        page--;
    }
    //이동할 페이지의 번호에 스크롤할 위치 계산
    var posTop = (page - 1) * ($(window).height());
    //계산한 위치로 이동
    $html.animate({ scrollTop: posTop }, timeScrollAnimation);
});

/* 새로고침 히스토리 기억 */
history.scrollRestoration = "auto";