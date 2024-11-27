package edu.ucsb.cs156.courses.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FinalExam {
  String hasFinals;
  String comments;
  String examDay;
  String examDate;
  String beginTime;
  String endTime;
}