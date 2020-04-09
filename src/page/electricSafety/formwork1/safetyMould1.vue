<!--安全概况左侧子模版-->
<template>
  <div class="safety-mould1">
    <div class="hidden-trouble">
      <p class="title"><i class="iconfont icon-Total"></i>快速隐患处理
        <span><a class="first">总数</a><a>当天</a></span></p>
      <div class="bg-box">
        <div>
          <p>共有</p>
          <p class="text-num">{{dangerNum}}</p>
          <p>条隐患报警</p>
        </div>
      </div>
    </div>
    <div class="wind-review">
      <p class="title"><i class="iconfont icon-Electricitysafety"></i>用电安全风险评估
        <i class="iconfont icon-Popup"></i></p>
      <div class="wind-review-box">
        <div class="top">
          <div class="top-box">
            <p class="special"><span>{{windRating}}</span>分</p>
            <p>电气系统安全评估</p>
          </div>
        </div>
        <div class="bottom top">
          <div class="top-box">
            <p class="special"><i class="iconfont icon-Grade3"></i>级</p>
            <p>电气火灾风险等级</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "safetyMould1",
        data() {
            return {
                dangerNum: '645538',
                windRating: 60,
            }
        }
    }
</script>

<style scoped lang="less">
  .safety-mould1 {

    .hidden-trouble {
      display: inline-block;
      width: 273px;

      .bg-box {
        position: relative;
        width: 273px;
        height: 237px;
        background: url("../../../../static/images/defect-treatment-bg.png") center center no-repeat;
        background-color: rgba(0, 0, 0, 0.25);

        div {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;

          .text-num {
            font-size: 36px;
            color: #f00;
          }
        }
      }
    }

    .wind-review {
      display: inline-block;
      margin-left: 8px;
      width: 226px;

      .wind-review-box {
        height: 237px;
        background-color: rgba(0, 0, 0, 0.25);

        .top {
          position: relative;
          height: 118px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);

          .top-box {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;

            p {
              white-space: nowrap;

              &.special {
                color: #ffd200;
                span{
                  padding: 0 0.4rem;
                  font-size: 36px;
                }
              }
            }
          }
        }

        .bottom {
          border-bottom: none;
          .top-box p.special{
            color: #f00;
            i{
              margin-right: 0.6rem;
              font-size: 30px;
            }
          }
        }
      }
    }
  }
</style>
