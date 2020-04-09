<template>
  <div>
    <Row v-for="(item, index) in row" :key="index" type="flex" justify="start" class="expand-row">
        <Col span="4">
            <span >{{ item.name }}: </span>
            <span >{{ item.total }}</span>
        </Col>
        <Col span="4">
            <span >{{ item. nomal}}: </span>
            <span >{{ item.nomal_total }}</span>
        </Col>
        <Col span="4">
            <span >{{ item. baojing}}: </span>
            <span style="color:red">{{ item.baojing_total }}</span>
        </Col>
        <Col span="4">
            <span >{{ item. lixian}}: </span>
            <span style="color:orange">{{ item.lixian_total }}</span>
        </Col>
        <Col span="4">
            <span >{{ item. yibaofei}}: </span>
            <span >{{ item.yibaofei_total }}</span>
        </Col>
    </Row>
  </div>
</template>

<script>
export default {
  props: {
            row: Array
        }
};
</script>

<style scoped>
.expand-row{
        margin-bottom: 10px;
    }
</style>
