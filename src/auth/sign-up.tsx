import { useState } from 'react';

import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Checkbox } from '../components/ui/Checkbox';

export function Signup() {
  const [userType, setUserType] = useState<'일반회원' | '작가' | '소품샵'>(
    '일반회원'
  );

  return (
    <div className="flex w-screen flex-col items-center gap-4 p-4">
      <div className="flex w-full max-w-md gap-2">
        <Button
          className="flex-1"
          label="일반회원"
          onClick={() => setUserType('일반회원')}
        />
        <Button
          className="flex-1"
          label="작가"
          onClick={() => setUserType('작가')}
        />
        <Button
          className="flex-1"
          label="소품샵"
          onClick={() => setUserType('소품샵')}
        />
      </div>

      <div className="flex w-full max-w-md flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="username">이름</label>
          <Input id="username" type="text" className="w-full" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="userid">아이디</label>
          <div className="flex w-full gap-2">
            <Input id="userid" className="flex-1" />
            <Button label="중복확인" className="w-32" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">비밀번호</label>
          <Input id="password" type="password" className="w-full" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="checkpw">비밀번호확인</label>
          <Input id="checkpw" type="password" className="w-full" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="phone">휴대폰번호</label>
          <div className="flex w-full gap-2">
            <Input id="phone" type="tel" className="flex-1" />
            <Button label="인증하기" className="w-32" />
          </div>
        </div>

        {userType !== '일반회원' && (
          <>
            <div className="flex flex-col gap-1">
              <label htmlFor="shopName">상호명</label>
              <Input id="shopName" className="w-full" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="shopNumber">사업자 등록번호</label>
              <Input id="shopNumber" className="w-full" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="shopAddress">사업자 주소지</label>
              <div className="flex w-full gap-2">
                <Input id="shopAddress" className="w-full" />
                <Button label="주소찾기" className="w-32" />
              </div>
              <div className="flex w-full gap-2">
                <Input className="w-full" />
                <Input className="w-full" />
              </div>
            </div>

            <div className="flex w-full gap-2">
              <label htmlFor="">업종</label>
              <label htmlFor="shopAddress">업태</label>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="">사업자등록증 업로드</label>
              <div className="flex w-full gap-2">
                <Input id="" className="flex-1" />
                <Button label="업로드" className="w-32" />
              </div>
            </div>

            <div className="flex w-full gap-2">
              <label htmlFor="">주요 카테고리</label>
            </div>
          </>
        )}

        <div className="flex flex-col gap-1">
          <span className="font-medium">약관동의</span>
          <div className="flex flex-col gap-2 border bg-gray-200 p-3">
            <Checkbox
              id="agree-all"
              label="전체동의"
              className="border-b border-gray-300 pb-2"
            />
            <Checkbox id="agree-age" label="만 14세 이상입니다 (필수)" />
            <Checkbox id="agree-terms" label="이용약관 (필수)" />
            <Checkbox
              id="agree-marketing"
              label="개인정보 마케팅 활용동의 (선택)"
            />
            <Checkbox
              id="agree-notification"
              label="이벤트, 쿠폰, 특가 알림 메일 및 sms 등 수신 (선택)"
            />
          </div>
        </div>

        <Button label="회원가입하기" className="w-full" />
      </div>
    </div>
  );
}
