#【纯肌肉记忆四步走】

若干类似题目锤炼后，终于独立做出来了，😓。掌握套路后，代码几乎就是肌肉记忆。

四步走。

## 1）根据问题给出二维dp数组定义。

要求s子序列中t的个数。立刻定义dp[i][j]: s的前i个字符中的t的前j个字符的子序列个数。后续为了方便叙述，dp[i][j]描述为字符串s_i中t_j的个数。

## 2）分别令两个维度为0，推测边界。

dp[0][j]表示s_0中t_j的个数。s_0是空字符串，只有当j=0时，才有dp[0][j] = 1，表示s子空串中有一个t子空串，否则dp[0][j] = 0，因为一个空串不可能包含一个非空串。

dp[i][0]表示s_i中t0的个数。t_0是空字符串，显然任何串（包括空串）都含有一个空子串。因此dp[i][0] = 1。

注意到，dp[i][0] = 1实际上已经包含了dp[0][j] = 1的情形。

## 3）寻找转移方程。

dp[i][j]显然要从dp[i-1][?]递推而来。立即思考dp[i-1][j], dp[i-1][j-1]分别与dp[i][j]的关系。

因为少一个字符，自然而然从当前字符着手。考察si的第i个字符(表为s[i])和tj的第j个字符(表为t[j])的关系。

若s[i] ≠ t[j]：那么s_i中的所有t_j子序列，必不包含s[i]，即s_i-1和s_i中tj的数量是一样的，得到该情形的转移方程:

dp[i][j] = dp[i-1][j]
若s[i] = t[j]：假设s_i中的所有t_j子序列中，包含s[i]的有a个，不包含的有b个。s_i中包含s[i]的子序列个数相当于s_i-1中t_j-1的个数，不包含s[i]的子序列个数与上一种情况一样，于是得到该情形的转移方程：

a = dp[i-1][j-1]
b = dp[i-1][j]
dp[i][j] = a + b = dp[i-1][j-1] + dp[i-1][j]
## 4）空间压缩。

也是固定套路，先从二维数组转两个一维数组（交替滚动），再从两个一维数组转一个一维数组（原地滚动），原地滚动时要注意是否需要逆序。

下面给出代码。

==== 二维dp ====

```java
==== 交替滚动一维dp ====

public int numDistinct(String s, String t) {
    if(t.length() > s.length()) return 0; // s长度小于t时间直接返回0
    int sn = s.length(), tn = t.length();
    int[] pre = new int[tn + 1]; // 注意数组大小由dp定义决定
    int[] cur = new int[tn + 1];
    pre[0] = 1;
    cur[0] = 1; // 当t为空串时，此行是必须的
    for(int i = 1; i < sn + 1; i++){
        for(int j = 1; j < tn + 1; j++){
            if(s.charAt(i-1) == t.charAt(j-1)) 
                cur[j] = pre[j-1] + pre[j];
            else cur[j] = pre[j];
        }
        for(int k = 0; k < tn + 1; k++) pre[k] = cur[k];
    }
    return cur[tn];
}
```
==== 原地滚动一维dp ====
```java
public int numDistinct(String s, String t) {
    if(t.length() > s.length()) return 0; // s长度小于t时间直接返回0
    int sn = s.length(), tn = t.length();
    int[] dp = new int[tn + 1]; // 注意数组大小由dp定义决定
    dp[0] = 1;
    for(int i = 1; i < sn + 1; i++){
        for(int j = tn; j >= 1; j--){ // 注意逆序
            if(s.charAt(i-1) == t.charAt(j-1)) // 省去了不等时的dp[j] = dp[j]
                dp[j] = dp[j-1] + dp[j];
        }
    }
    return dp[tn];
}
```