<template>
  <div>
    <div class="emptyBox">
      <img src="@/assets/images/empty.png" alt="" class="emptyGif">
      <p>--暂无数据--</p>
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
  height: auto;
  margin: 0 auto;
}
.emptyBox>p{
  text-align: center;
  margin-top:pxTorem(25px);
  font-size: pxTorem(32px)
}
.emptyGif{
  width: pxTorem(300px);
  // margin: 0 auto;
}
</style>
