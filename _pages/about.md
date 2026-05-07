---
permalink: /
layout: single
classes: wide
author_profile: false
redirect_from: 
  - /about/
  - /about.html
---

<style>
  /* 1. 隐藏默认自带的页面标题 */
  h1.page__title {
    display: none !important;
  }
  /* 2. 彻底消灭 Windows 电脑上因为 100vw 撑满而产生的底部横向滚动条和右侧白边 */
  body {
    overflow-x: hidden !important;
  }
</style>

<div style="
  width: 100vw; 
  margin-left: calc(50% - 50vw); 
  margin-right: calc(50% - 50vw); 
  max-width: 100vw; 
  position: relative; 
  background-color: #020713; /* 核心修复：深空蓝打底，填补任何可能的白边，与图片左侧无缝融合 */
  background-image: url('https://zoc-oec.github.io/images/Cover.png'); 
  background-size: cover; 
  background-position: center bottom; /* 核心修复：将图片锚定在底部，保护底部的文字和图标不被切掉 */
  margin-bottom: 50px; 
  display: flex; 
  min-height: 560px; /* 稍微加高一点，给图片更多展示空间 */
">
  
  <div style="background: linear-gradient(to right, rgba(2,7,19, 1) 0%, rgba(2,7,19, 0.92) 45%, rgba(2,7,19, 0) 100%); padding: 60px 8%; width: 55%; min-width: 500px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center;">

    <div style="max-width: 650px;">
      <h1 style="color: white; font-size: 3em; line-height: 1.2; margin-top: 0; border-bottom: none; font-weight: 700; letter-spacing: -0.5px;">
        Advancing Vision Science <br>Through Longitudinal Data <br>and <span style="color: #00bfa5;">Foundation AI</span>
      </h1>

      <p style="color: #d0d7de; font-size: 1.15em; line-height: 1.6; margin: 20px 0;">
        The ZOC Ocular Epidemiology Consortium (ZOC-OEC) integrates longitudinal cohorts, multimodal imaging, multi-omics and AI to advance the understanding, prediction, and prevention of blinding eye diseases.
      </p>

      <div style="margin-top: 35px; display: flex; gap: 15px; flex-wrap: wrap;">
        <a href="#our-core-cohorts" style="display: inline-block; padding: 12px 28px; background-color: #00bfa5; color: #020713; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 1em; transition: all 0.3s;">Explore Our Research ➔</a>
        <a href="#our-core-cohorts" style="display: inline-block; padding: 12px 28px; background-color: transparent; color: white; border: 1px solid white; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 1em; transition: all 0.3s;">Our Cohorts</a>
      </div>
    </div>

  </div>
</div>


Our work integrates classical epidemiological methods with cutting-edge approaches — including AI prediction models, Transformer architectures, multimodal data fusion, and proteomics — to generate globally impactful insights in ocular epidemiology.

## Our Core Cohorts

### 1. ZAP — Zhongshan Angle Closure Prevention Trial
The ZAP cohort is a landmark randomized controlled trial and long-term prospective study examining the natural history and prevention of primary angle closure glaucoma (PACG). With over 18 years of follow-up, ZAP represents one of the world's longest-running trials in glaucoma epidemiology.

Current research leverages the 18-year follow-up dataset to address new longitudinal questions on angle closure progression, and utilizes advanced anterior segment imaging — including CASIA2 biometric measurements — to characterize structural risk factors for long-term disease development.

**Key focus areas:** angle closure progression · laser iridotomy outcomes · anterior segment biometry · long-term glaucoma risk

### 2. GDES — Guangzhou Diabetic Eye Study
The Guangzhou Diabetic Eye Study (GDES) is a comprehensive population-based cohort dedicated to understanding the ocular complications of diabetes in a Chinese population. The study captures a broad spectrum of diabetic eye disease, from early subclinical changes to sight-threatening complications.

GDES integrates retinal imaging, systemic biomarker profiling, and longitudinal clinical data to develop robust prediction models for diabetic retinopathy progression and to identify novel risk factors for vision loss in diabetic patients.

**Key focus areas:** diabetic retinopathy · retinal imaging biomarkers · risk prediction · systemic-ocular interactions

### 3. ZHMC — Zhongshan Myopia Cohort
The Zhongshan Myopia Cohort (ZHMC) is a longitudinal population-based study designed to investigate the onset, progression, and complications of myopia. ZHMC systematically characterizes the structural and functional ocular changes associated with myopia development, with a particular focus on high myopia and its vision-threatening sequelae.

A central research priority of ZHMC is elucidating the mechanisms underlying High Myopic Optic Neuropathy (HMON), including the roles of choroidal ischemia and Bruch's membrane injury in driving irreversible optic nerve damage. The cohort leverages advanced multimodal imaging and longitudinal biomarker data to build prediction models for myopia progression and complication risk.

**Key focus areas:** myopia progression · high myopia complications · HMON mechanisms · choroidal imaging · prediction modeling

---

## What We Do
* **Data-Driven Discovery:** We apply rigorous statistical methods — including longitudinal analysis, restricted cubic spline modeling, and Mendelian randomization — to uncover disease patterns across our cohorts.
* **AI & Multimodal Modeling:** We develop deep learning and Transformer-based models integrating retinal imaging, proteomics, and clinical data to predict disease onset, progression, and treatment response.
* **Global Collaboration:** We actively partner with international research groups, including UK Biobank (UKB), AI-READI, and SERI, to conduct cross-ethnic and cross-population studies of ocular disease.
* **Open Science:** We are committed to responsible data sharing. Collaboration and data access inquiries are welcome — please see our Data Access Policy or contact us directly.

## Contact / Collaboration Inquiry
We welcome collaboration proposals from researchers, postdoctoral fellows, and PhD students worldwide.

**Email:** wangwei@gzzoc.com  
**Website:** https://zoc-oec.github.io/  
**Location:** Zhongshan Ophthalmic Center, Sun Yat-sen University, Guangzhou, China
