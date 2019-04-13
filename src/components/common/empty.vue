<template>
  <div>
    <div class="emptyBox">
      <img src="@/assets/images/empty.png" alt="" class="emptyGif">
      <p>很抱歉~</p>
      <p>我没有找到数据呢</p>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.emptyBox{
  width: pxTorem(300px);
  height: pxTorem(400px);
  // background: #f00;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  margin: auto;
}
.emptyBox>p{
  text-align: center;
  margin-top:pxTorem(25px);
  font-size: pxTorem(30px)
}
.emptyGif{
  width: pxTorem(300px);
  // margin: 0 auto;
}
</style>
