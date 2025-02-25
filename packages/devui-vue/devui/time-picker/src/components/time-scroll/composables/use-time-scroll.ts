import { ref } from 'vue'

export default function useTimeScroll():any{
  const scrollBoxDom = ref()
  const scrollContentDom = ref()
  const scrollThumbDom = ref()
  const scrollTrackDom = ref()

  const isDown = ref(false)

  // 获取滚动条 thumb高度 
  const getScrollHeight=()=>{
    const thumbHeight = (scrollContentDom.value.clientHeight  / scrollContentDom.value.scrollHeight) * 100 
    scrollThumbDom.value.style.height = thumbHeight + '%'
  }
  
  // 设置滚动条 thumb位置
  const setVirtualScroll =()=>{
    const thumbMoveY = (scrollContentDom.value.scrollTop * 100 / scrollContentDom.value.clientHeight);
    scrollThumbDom.value.style.transform = `translateY(${thumbMoveY}%)`
  }

  // 点击轨道 thumb滚动到相应位置
  const clickTrackFun = (e:MouseEvent)=>{
    const offset = Math.abs(scrollTrackDom.value.getBoundingClientRect().top - e.clientY)
    const thumbCenter = scrollThumbDom.value.offsetHeight / 2;
    const thumbPosition = (offset - thumbCenter) * 100 / scrollContentDom.value.offsetHeight;
    scrollContentDom.value.scrollTop = (thumbPosition * scrollContentDom.value.scrollHeight / 100);
    scrollContentDom.value.style.top = scrollContentDom.value.scrollTop + 'px'
  }

  // 鼠标拖到
  const mouseDownThum = ()=>{
    isDown.value = true
    scrollTrackDom.value.style.opacity = 1
  }
  // 鼠标离开
  const mouseOutThum = (e:MouseEvent)=>{
    isDown.value = false
    thumbMouseMove(e)
  }
  
  const thumbMouseMove = (e:any)=>{
    
    const path = (e.composedPath && e.composedPath()) || e.path

    if(path.includes(scrollBoxDom.value) || isDown.value){
      scrollTrackDom.value.style.opacity = 1
    }else{
      scrollTrackDom.value.style.opacity = 0
    }

    if( !isDown.value ) return
    clickTrackFun(e)
    
  }

  const getScrollWidth=()=>{
    const ua = navigator.userAgent
    let marginRight = -20

    if (ua.indexOf('Chrome') > -1) {
      marginRight = -8
    }else{
      const outer = document.createElement('div');
      outer.className = 'devui-scrollbar-wrap';
      outer.style.width = '100px';
      outer.style.visibility = 'hidden';
      outer.style.position = 'absolute';
      outer.style.top = '-9999px';
      document.body.appendChild(outer);

      const widthNoScroll = outer.offsetWidth;
      outer.style.overflow = 'scroll';

      const inner = document.createElement('div');
      inner.style.width = '100%';
      outer.appendChild(inner);

      const widthWithScroll = inner.offsetWidth;
      outer.parentNode.removeChild(outer);

      marginRight = (widthNoScroll - widthWithScroll + 3) * -1;
    }
    
    return marginRight
  }


  return{
    scrollThumbDom,scrollTrackDom,scrollContentDom,scrollBoxDom,isDown,
    getScrollHeight,setVirtualScroll,clickTrackFun,mouseDownThum,mouseOutThum,thumbMouseMove,
    getScrollWidth
  }
}