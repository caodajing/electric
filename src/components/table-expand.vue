<template>
  <div>
    <Row v-for="(item, index) in row" :key="index" type="flex" justify="start" class="expand-row">
        <Col span="12">
            <span >单位: </span>
            <span >{{ item.detection_unit }}</span>
        </Col>
        <Col span="12">
            <span >数值: </span>
            <span >{{ item.cur_detection }}</span>
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
