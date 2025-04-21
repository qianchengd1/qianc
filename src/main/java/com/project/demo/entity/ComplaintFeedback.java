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
 * 投诉反馈：(ComplaintFeedback)表实体类
 *
 */
@TableName("`complaint_feedback`")
@Data
@EqualsAndHashCode(callSuper = false)
public class ComplaintFeedback implements Serializable {

    // ComplaintFeedback编号
    @TableId(value = "complaint_feedback_id", type = IdType.AUTO)
    private Integer complaint_feedback_id;

    // 标题名称
    @TableField(value = "`title_name`")
    private String title_name;
    // 反馈类型
    @TableField(value = "`feedback_type`")
    private String feedback_type;
    // 社区用户
    @TableField(value = "`community_users`")
    private Integer community_users;
    // 用户姓名
    @TableField(value = "`user_name`")
    private String user_name;
    // 备注信息
    @TableField(value = "`remarks`")
    private String remarks;



    // 审核状态
    @TableField(value = "examine_state")
    private String examine_state;



    // 审核回复
    @TableField(value = "examine_reply")
    private String examine_reply;




    // 更新时间
    @TableField(value = "update_time")
    private Timestamp update_time;

    // 创建时间
    @TableField(value = "create_time")
    private Timestamp create_time;







}
