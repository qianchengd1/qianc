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
 * 志愿者申请：(VolunteerApplication)表实体类
 *
 */
@TableName("`volunteer_application`")
@Data
@EqualsAndHashCode(callSuper = false)
public class VolunteerApplication implements Serializable {

    // VolunteerApplication编号
    @TableId(value = "volunteer_application_id", type = IdType.AUTO)
    private Integer volunteer_application_id;

    // 社区用户
    @TableField(value = "`community_users`")
    private Integer community_users;
    // 用户姓名
    @TableField(value = "`user_name`")
    private String user_name;
    // 附件信息
    @TableField(value = "`attachment_information`")
    private String attachment_information;
    // 申请日期
    @TableField(value = "`application_date`")
    private Timestamp application_date;
    // 申请备注
    @TableField(value = "`application_remarks`")
    private String application_remarks;



    // 审核状态
    @TableField(value = "examine_state")
    private String examine_state;







    // 更新时间
    @TableField(value = "update_time")
    private Timestamp update_time;

    // 创建时间
    @TableField(value = "create_time")
    private Timestamp create_time;







}
