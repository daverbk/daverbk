[简体中文](./README_HANS.md)

<p align="center">
  <img width="450" src="https://user-images.githubusercontent.com/31800695/138593031-536f9b8c-714c-4c4f-8725-63ea105fcca0.png">
  <p align="center">💻📌  使用 Gist 显示你最常用的编程语言</p>
  <p align="right"><i>
  <a href="https://github.com/Aveek-Saha/lang-stats-box">Aveek-Saha/lang-stats-box</a> 的 Fork，做了一些增强修改。
  </i></p>
</p>

# github-lang-box
[![npm](https://img.shields.io/npm/v/github-activity-box.svg?style=flat-square)](https://www.npmjs.com/package/github-lang-box)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/maxchang3/github-lang-box/ci.yml?style=flat-square&label=CI)](https://github.com/maxchang3/github-lang-box/actions)
[![License](https://img.shields.io/github/license/maxchang3/github-lang-box?style=flat-square)](LICENSE)

## ✨ 增强功能

- ✅ 更新依赖项并完全使用 TypeScript 重构
- 📦 发布到 npm，支持通过 `npx` 或 `pnpx` 轻松使用
- 🔑 使用 `/user/repos` endpoint 获取所有存储库（包括私有存储库）
- 🎨 支持自定义描述、语言排除和存储库过滤

> **注意**: 由于使用了 `/user/repos` 接口，如果使用「Fine-grained access tokens」必须具有 `metadata:read` 权限。

## 使用方法

### 作为 CLI 使用

```bash
# 直接使用 npx/pnpx 运行
npx github-lang-box [options]

# 或全局安装
npm install -g github-lang-box
github-lang-box [options]
```

**选项：**
- `--dry` - 预览输出而不更新 Gist

**环境变量：**
| 变量         | 描述                                                                                                  |
| ------------ | ----------------------------------------------------------------------------------------------------- |
| GH_TOKEN     | 具有 `gist` 和 `metadata:read` 范围的 GitHub access token                                             |
| GIST_ID      | 你的 Gist URL 中的 ID：<br> `https://gist.github.com/username/`**`8335e85451541072dd25fda601129f7d`** |
| GH_USERNAME  | 你的 GitHub 用户名                                                                                    |
| EXCLUDE      | （可选）要排除的语言，使用**英文**逗号分隔 <br> 示例：`Jupyter Notebook,CSS,TeX,PHP`                  |
| EXCLUDE_REPO | （可选）要排除的存储库，使用**英文**逗号分隔 <br> 示例：`username/repo1,username/repo2`               |

### GitHub Action 设置

#### 前提条件

1. 在 https://gist.github.com/ 创建一个新的公共 GitHub Gist
2. 在 https://github.com/settings/tokens?type=beta 生成一个具有 `gist` 和 `metadata:read` 范围的访问令牌

#### 设置 Workflow

1. 将 [此 workflow 文件](./action.yml) 复制到你的存储库的 `.github/workflows/` 目录
2. 转到你的存储库的 **Settings > Secrets**
3. 按上述环境变量表添加所需的密钥
4. 提交并推送你的更改

## 致谢

灵感来自 [@matchai 的 bird-box](https://github.com/matchai/bird-box)。

这是 [@Aveek-Saha 的 lang-stats-box](https://github.com/Aveek-Saha/lang-stats-box) 的一个 fork。
