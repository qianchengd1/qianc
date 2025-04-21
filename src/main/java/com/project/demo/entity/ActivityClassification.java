package com.project.demo.entity;

import com.alibaba.fastjson.annotation.JSONField;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.*;

import java.io.Serializable;
import java.sql.Timestamp;


/**
 * 活动分类：(ActivityClassification)表实体类
 *
 */
@TableName("`activity_classification`")
@Data
@EqualsAndHashCode(callSuper = false)
public class ActivityClassification implements Serializable {

    // ActivityClassification编号
    @TableId(value = "activity_classification_id", type = IdType.AUTO)
    private Integer activity_classification_id;

    // 活动类型
    @TableField(value = "`activity_type`")
    private String activity_type;










    // 更新时间
    @TableField(value = "update_time")
    private Timestamp update_time;

    // 创建时间
    @TableField(value = "create_time")
    private Timestamp create_time;







}
