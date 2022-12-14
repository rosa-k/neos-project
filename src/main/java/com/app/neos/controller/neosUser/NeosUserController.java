package com.app.neos.controller.neosUser;

import com.app.neos.domain.college.QCollegeDTO;
import com.app.neos.domain.study.StudyDTO;
import com.app.neos.domain.user.UserDTO;
import com.app.neos.entity.study.Study;
import com.app.neos.entity.user.User;
import com.app.neos.repository.study.StudyRepository;
import com.app.neos.repository.user.UserRepository;
import com.app.neos.service.admin.AdminService;
import com.app.neos.service.join.JoinService;
import com.app.neos.service.neosUser.NeosUserService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/neosUser/*")
@RequiredArgsConstructor
@Slf4j
public class NeosUserController {
    private final NeosUserService neosUserService;
    private final UserRepository userRepository;
    private final StudyRepository studyRepository;
    private final JoinService joinService;

    @GetMapping("/list-before")
    public String listBefore() {
        return "app/neosUser/neosListBefore";
    }

    @GetMapping("/list-after")
    public String listAfter() {
        return "app/neosUser/neosListAfter";
    }

    @GetMapping("/info-yes")
    public String infoYes() {
        return "app/neosUser/userInfoYes";
    }

    @GetMapping("/info-no-login")
    public String infoNoLogin() {
        return "app/neosUser/userInfoNoLogin";
    }

    @GetMapping("/user-info-not-invite")
    public String userInfoNotInvite() {
        return "app/neosUser/userInfoNotInvite";
    }

    @GetMapping("/my-info")
    public String myInfo() {
        return "app/neosUser/myInfo";
    }

    @GetMapping("/chat")
    public String chat() {
        return "app/fix/chattingBase";
    }

    @GetMapping("/chat-all")
    public String chatAll() {
        return "app/fix/chattingAll";
    }

    @GetMapping("/modal")
    public String modal() {
        return "app/neosUser/modalList";
    }

    //    네오스인 페이지 목록 로그인 후
    @GetMapping("/list")
    public String list(Model model , @RequestParam(required = false,defaultValue = "")String keyWord ) {
//        List<UserDTO> userDTOS = neosUserService.findUser();
//        userDTOS.forEach(t -> log.info(t.getCollege().getCollegeName().toString()));

//        전체 유저 정보 불러오기
       List<UserDTO> userDTOS = userRepository.findAll().stream().map(i->i.toDTO()).collect(Collectors.toList());
        model.addAttribute("users", userDTOS);

//        검색
//        List<UserDTO> userDTOList = neosUserService.findByKeyword(keyWord);
//        model.addAttribute("userDTOLists" , userDTOList);

       /* if (keyWord.equals()){

        }*/




        //   유저 상세보기
        model.addAttribute("collegeCityList",joinService.getCollegeCityList());

        return "app/neosUser/neosListAfter";
    }
//  네오스인 페이지 목록  로그인 전
    @GetMapping("/before/list")
    public String beforeList(Model model){
//        List<UserDTO> userDTO = neosUserService.findUser();

        List<UserDTO> userDTO = userRepository.findAll().stream().map(i->i.toDTO()).collect(Collectors.toList());
        model.addAttribute("users",userDTO);

        return "app/neosUser/neosListBefore";

    }



//  유저 로그인 후 상세보기
    @GetMapping("/info/yes")
    public String infoYes(Long userId  ,Model model){
//        List<User> userDTOS = neosUserService.findUser();
//        model.addAttribute("users",userDTOS);

//        UserDTO userDTO = (UserDTO) userRepository.findById(userId).stream().map(i->i.toDTO()).collect(Collectors.toList());
//        model.addAttribute("userInterest", neosUserService.findByUserId(userId));

//       유저
        model.addAttribute("user", neosUserService.findByUserId(userId));

//        스터디
        model.addAttribute("studys" , neosUserService.findByStudyId(userId));

        return "app/neosUser/userInfoYes";
    }






}
