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
 * 报修服务：(RepairService)表实体类
 *
 */
@TableName("`repair_service`")
@Data
@EqualsAndHashCode(callSuper = false)
public class RepairService implements Serializable {

    // RepairService编号
    @TableId(value = "repair_service_id", type = IdType.AUTO)
    private Integer repair_service_id;

    // 报修编号
    @TableField(value = "`repair_number`")
    private String repair_number;
    // 报修物品
    @TableField(value = "`repair_items`")
    private String repair_items;
    // 物品图片
    @TableField(value = "`item_images`")
    private String item_images;
    // 社区用户
    @TableField(value = "`community_users`")
    private Integer community_users;
    // 用户姓名
    @TableField(value = "`user_name`")
    private String user_name;
    // 家庭住址
    @TableField(value = "`home_address`")
    private String home_address;
    // 联系方式
    @TableField(value = "`contact_information`")
    private String contact_information;
    // 报修日期
    @TableField(value = "`repair_date`")
    private Timestamp repair_date;
    // 报修原因
    @TableField(value = "`reason_for_repair`")
    private String reason_for_repair;



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
