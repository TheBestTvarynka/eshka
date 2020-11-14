import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import ConfirmationWindow from '../ConfirmationWindow';
import TeamManagePage from '../TreamManagePage';
import InvitePage from '../InvitePage';
import lists from '../styles/lists.module.sass';
import containers from '../styles/containers.module.sass';
import buttons from '../styles/buttons.module.sass';
import { IAppState } from '../../models/appState';
import { loadTeamRoutine, updateTeamRoutine } from '../../sagas/team/routines';
import Loader from '../Loader';

const Team: React.FC<ITeamProps> = ({ team, loadTeam, isLoading, updateTeam }) => {
  const [cw, setCW] = useState<boolean>(false);
  const [tm, setTM] = useState<boolean>(false);
  const [ip, setIP] = useState<boolean>(false);

  useEffect(() => {
    if (team?.id) {
      loadTeam(team.id);
    }
  }, [loadTeam]);

  return (
    <div className={containers.content_general}>
      {isLoading
        ? <Loader />
        : team && (
            <div className={containers.main_content}>
              <span className={containers.dark_item_title}>{team.name}</span>
              <span className={containers.description}>{team.description}</span>
              <div className={containers.two_columns}>
                <div className={lists.light_list}>
                  <span className={lists.light_list_title}>Members</span>
                  {team.members.map(member => (
                    <div key={member.id} className={lists.light_list_item}>
                      <span>{member.fullName}</span>
                    </div>
                  ))}
                </div>
                <div className={lists.light_list}>
                  <span className={lists.light_list_title}>Subjects</span>
                  {team.subjects.map(subject => (
                    <Link to={`/subject/${subject.id}`} key={subject.id} className={lists.light_list_item}>
                      <span>{subject.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )
      }
      <div className={containers.vertical_actions_panel}>
        <button className={`${buttons.button_simple} ${buttons.blue_simple}`} onClick={() => setTM(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
               width="15" height="15"
               viewBox="0 0 172 172"
               style={{fill: "#000000"}}>
            <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: "normal"}}>
              <path d="M0,172v-172h172v172z" fill="none" />
              <g fill="#000000">
                <path d="M122.765,6.88c-0.77937,0.1075 -1.505,0.49719 -2.0425,1.075l-89.44,89.3325c-0.33594,0.37625 -0.60469,0.80625 -0.7525,1.29l-23.435,61.92c-0.45687,1.24969 -0.14781,2.66063 0.80625,3.60125c0.94063,0.95406 2.35156,1.26313 3.60125,0.80625l61.92,-23.435c0.48375,-0.14781 0.91375,-0.41656 1.29,-0.7525l4.4075,-4.4075c0.81969,-0.34937 1.47813,-1.00781 1.8275,-1.8275l83.0975,-83.205c1.02125,-0.83312 1.49156,-2.16344 1.19594,-3.45344c-0.29562,-1.27656 -1.30344,-2.28438 -2.58,-2.58c-1.29,-0.29563 -2.62031,0.17469 -3.45344,1.19594l-82.345,82.2375c-2.4725,-1.14219 -6.24844,-2.41875 -11.0725,-2.2575c0.56438,-1.53187 1.41094,-2.44562 1.72,-4.3c0.7525,-4.47469 0.34938,-9.97062 -3.655,-13.975c-4.01781,-4.01781 -9.55406,-4.39406 -14.0825,-3.5475c-1.59906,0.29563 -2.37844,1.11531 -3.7625,1.6125c0.05375,-0.48375 0.20156,-0.56437 0.215,-1.075c0.08063,-2.98312 -0.61812,-6.67844 -2.9025,-9.9975l82.2375,-82.345c1.02125,-0.98094 1.33031,-2.49937 0.77938,-3.80281c-0.5375,-1.30344 -1.84094,-2.13656 -3.25188,-2.10969c-0.1075,0 -0.215,0 -0.3225,0zM38.1625,100.2975c0.86,1.57219 1.22281,3.10406 1.1825,4.6225c-0.05375,2.33813 -0.80625,4.35375 -1.29,5.6975c-0.52406,1.45125 -0.02687,3.06375 1.22281,3.96406c1.24969,0.90031 2.94281,0.86 4.15219,-0.09406c0.98094,-0.76594 4.25969,-2.51281 7.525,-3.1175c3.26531,-0.60469 6.16781,-0.28219 8.0625,1.6125c1.90813,1.90813 2.27094,4.82406 1.72,8.0625c-0.55094,3.23844 -2.24406,6.51719 -2.9025,7.4175c-0.95406,1.20938 -0.99437,2.9025 -0.09406,4.15219c0.90031,1.24969 2.51281,1.74688 3.96406,1.22281c4.36719,-1.33031 7.76688,-0.86 10.105,-0.1075l-1.6125,1.6125l-37.9475,14.405l-9.89,-9.9975l14.2975,-37.9475z" />
              </g>
            </g>
          </svg>
          <span>Manage</span>
        </button>
        <button className={`${buttons.button_simple} ${buttons.green_simple}`} onClick={() => setIP(true)}>
          <img src="https://img.icons8.com/material/50/000000/plus-math--v2.png" alt=""/>
          <span>Invite</span>
        </button>
        <button className={`${buttons.button_simple} ${buttons.red_simple}`} onClick={() => setCW(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
               width="15" height="15"
               viewBox="0 0 172 172"
               style={{"fill": "#000000"}}>
            <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: "normal"}}>
              <path d="M0,172v-172h172v172z" fill="none" />
              <g fill="#000000">
                <path d="M86,6.88c-43.6552,0 -79.12,35.4648 -79.12,79.12c0,43.6552 35.4648,79.12 79.12,79.12c26.17935,0 49.42112,-12.74611 63.81469,-32.36422c0.77173,-0.98775 0.94516,-2.31706 0.4527,-3.46975c-0.49247,-1.15269 -1.57289,-1.94631 -2.82011,-2.0715c-1.24722,-0.12519 -2.46382,0.43787 -3.17555,1.46969c-13.14707,17.91917 -34.32338,29.55578 -58.27172,29.55578c-39.9368,0 -72.24,-32.3032 -72.24,-72.24c0,-39.9368 32.3032,-72.24 72.24,-72.24c23.94833,0 45.12464,11.63661 58.27172,29.55578c0.71174,1.03182 1.92834,1.59488 3.17555,1.46969c1.24722,-0.12519 2.32764,-0.91881 2.82011,-2.0715c0.49247,-1.15269 0.31903,-2.482 -0.4527,-3.46975c-14.39357,-19.61811 -37.63534,-32.36422 -63.81469,-32.36422zM134.1264,55.0064c-1.39982,0.00037 -2.65984,0.84884 -3.18658,2.14577c-0.52674,1.29693 -0.21516,2.7837 0.78799,3.76001l21.64781,21.64781h-74.25563c-1.24059,-0.01754 -2.39452,0.63425 -3.01993,1.7058c-0.62541,1.07155 -0.62541,2.39684 0,3.46839c0.62541,1.07155 1.77935,1.72335 3.01993,1.7058h74.25563l-21.64781,21.64781c-0.89867,0.86281 -1.26068,2.14404 -0.94641,3.34956c0.31427,1.20552 1.2557,2.14696 2.46122,2.46122c1.20552,0.31427 2.48675,-0.04774 3.34956,-0.94641l27.21766,-27.21765c0.85429,-0.65168 1.35506,-1.66508 1.35374,-2.73956c-0.00132,-1.07448 -0.50457,-2.08664 -1.36046,-2.73623l-27.21094,-27.21094c-0.64765,-0.66575 -1.53698,-1.04135 -2.46578,-1.04141z" />
              </g>
            </g>
          </svg>
          <span>Leave</span>
        </button>
      </div>
      {cw && <ConfirmationWindow title="Confirm leaving"
                                 question="Leave this team?"
                                 submitValue="Leave"
                                 onSubmit={() => setCW(false)}
                                 cancelValue="Cancel"
                                 onCancel={() => setCW(false)}
      />}
      {tm && <TeamManagePage onClose={() => setTM(false)}
                             onSubmit={data => {
                               updateTeam(data);
                               setTM(false);
                             }}
                             team={team}
      />}
      {ip && <InvitePage id={team?.id} onClose={() => setIP(false)} />}
    </div>
  );
}

const mapStateToProps = (appState: IAppState) => ({
  team: appState.team.team,
  isLoading: appState.team.isTeamLoading
});

const mapDispatchToProps = {
  loadTeam: loadTeamRoutine,
  updateTeam: updateTeamRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ITeamProps = ConnectedProps<typeof connector>;
export default connector(Team);