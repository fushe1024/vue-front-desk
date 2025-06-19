import { getSts } from '@/api/sys'
import { OSS_BUCKET, OSS_REGION } from '@/constants'
import OSS from 'ali-oss'

export const getOSSClient = async () => {
  // 从STS服务获取的临时访问凭证（AccessKey ID和AccessKey Secret）。
  const sts = await getSts()

  return new OSS({
    // 填写Bucket名称。
    bucket: OSS_BUCKET,
    // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
    region: OSS_REGION,
    // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
    accessKeyId: sts.Credentials.AccessKeyId,
    accessKeySecret: sts.Credentials.AccessKeySecret,
    // 从STS服务获取的安全令牌（SecurityToken）。
    stsToken: sts.Credentials.SecurityToken,
    refreshSTSToken: async () => {
      // 向您搭建的STS服务获取临时访问凭证。
      const sts = await getSts()
      return {
        accessKeyId: sts.Credentials.AccessKeyId,
        accessKeySecret: sts.Credentials.AccessKeySecret,
        stsToken: sts.Credentials.SecurityToken
      }
    },
    // 刷新临时访问凭证的时间间隔，单位为毫秒。
    refreshSTSTokenInterval: 5 * 1000
  })
}
